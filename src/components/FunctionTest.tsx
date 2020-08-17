import {boundMethod} from "autobind-decorator";
import {clamp, debounce, round} from "lodash";
import {EvalFunction, parse, MathNode} from "mathjs";
import React from "react";

export enum PropertyTypes {
    Viscosity,
    Density,
    Rpri,
    Ipri,
}

function toTex(root: MathNode) {
    return (
        root.toTex({
            handler: (node: MathNode) => {
                if (node.type === "SymbolNode") {
                    switch (node.name) {
                        case "T":
                            return "\\theta";

                        case "L":
                            return "\\lambda";
                    }
                }

                return node.value;
            },
            parenthesis: "auto",
        }) + ""
    );
}

interface IFunctionTestProps {
    function: string;
    type: PropertyTypes;

    maxTemperature: number;
    maxWavelength: number;
    minTemperature: number;
    minWavelength: number;

    onEvaluated(isValid: boolean): void;
}

interface IFunctionTestState {
    temperature: number;
    wavelength: number;
}

function isValidExpression(root: math.MathNode, useWavelength: boolean) {
    const queue = [root];
    const validVars = useWavelength ? ["T", "L"] : ["T"];

    do {
        const node = queue.shift();
        if (!node) {
            return true;
        }

        if (node.args) {
            queue.push(...node.args);
        }

        if (!node.isSymbolNode) {
            continue;
        }

        if (node.name && validVars.indexOf(node.name) >= 0) {
            continue;
        }

        return false;
    } while (true);
}

function getFullLatex(latex: string, result: any) {
    if (isNaN(result)) {
        return latex + "= NaN";
    }

    let equalSign = "=";
    if (result === Infinity) {
        result = "\\infty";
    } else if (result === -Infinity) {
        result = "-\\infty";
    } else if (typeof result === "number") {
        // TODO: dynamic 4 digits
        const rounded = round(result, 4);
        if (rounded !== result) {
            equalSign = "\\approx";
        }

        result = rounded;
    }

    return latex + equalSign + result;
}

class MathEvaluator {
    private latex = "";
    private formula = "";
    private compiled?: EvalFunction;

    constructor(public readonly useWavelength: boolean) {}

    public evaluate(
        formula: string,
        temperature: number,
        wavelength: number,
    ): string | false {
        if (formula !== this.formula) {
            this.setFormula(formula);
        }

        if (!this.compiled) {
            return false;
        }

        const scope: any = {
            T: temperature,
        };

        if (this.useWavelength) {
            scope.L = wavelength;
        }

        const result = this.compiled.evaluate(scope);
        return getFullLatex(this.latex, result);
    }

    private setFormula(formula: string) {
        this.latex = "";
        this.formula = formula;
        this.compiled = undefined;

        if (!formula) {
            return;
        }

        try {
            const root = parse(formula);
            const isValid = isValidExpression(root, this.useWavelength);

            if (!isValid) {
                return;
            }

            this.latex = toTex(root);
            this.compiled = root.compile();
        } catch {
            // Ignore: invalid formula
        }
    }
}

class FunctionTest extends React.PureComponent<
    IFunctionTestProps,
    IFunctionTestState
> {
    private readonly eval: MathEvaluator;
    private readonly reportValidation = debounce((isValid: boolean) => {
        this.props.onEvaluated(isValid);
    });

    constructor(props: IFunctionTestProps) {
        super(props);

        this.state = {
            temperature: clamp(32, props.minTemperature, props.maxTemperature),
            wavelength: clamp(650, props.minWavelength, props.maxWavelength),
        };

        this.eval = new MathEvaluator(false);
    }

    @boundMethod
    public setNumberValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({
            [e.target.id]: e.target.valueAsNumber,
        } as any);
    }

    public render() {
        const props = this.props;

        return (
            <div className="card">
                <div className="card-header bg-secondary">Function Test</div>

                <div className="card-body">
                    <div className="form-group row">
                        <label className="col-3" htmlFor="temperature">
                            Temperature
                        </label>
                        <div className="col-3">
                            <input
                                type="number"
                                id="temperature"
                                className="form-control"
                                min={props.minTemperature}
                                max={props.maxTemperature}
                                value={this.state.temperature}
                                onChange={this.setNumberValue}
                            />
                        </div>
                    </div>

                    {this.renderResult()}
                </div>
            </div>
        );
    }

    private renderResult() {
        const state = this.state;
        const result = this.eval.evaluate(
            this.props.function,
            state.temperature,
            state.wavelength,
        );

        if (result) {
            this.reportValidation(true);
            return <pre>{result}</pre>;
        }

        this.reportValidation(false);

        return <em className="text-danger">Function is invalid</em>;
    }
}

export default FunctionTest;
