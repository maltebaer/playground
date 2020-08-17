import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {boundMethod} from "autobind-decorator";
import React from "react";

import {CancelButton} from "./shared/Modal";
import ValidatedForm, {RequiredInfo} from "./shared/ValidatedForm";
import FunctionTest, {PropertyTypes} from "./FunctionTest";
import SubmitInfo from "./shared/SubmitInfo";

interface IMultiFormLiveState {
    formula: string;
    notes: string;

    minTemperature: number;
    maxTemperature: number;

    minWavelength: number;
    maxWavelength: number;

    isValid: boolean;

    success?: boolean;
}

const DEFAULT_STATE: IMultiFormLiveState = {
    formula: "",
    notes: "",

    maxTemperature: 450,
    maxWavelength: 900,
    minTemperature: 4,
    minWavelength: 60,

    isValid: false,
};

class MultiFormLive extends React.PureComponent<{}, IMultiFormLiveState> {
    public readonly state = DEFAULT_STATE;

    private readonly requiredInput = React.createRef<HTMLInputElement>();

    @boundMethod
    public setFormula(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({
            formula: e.target.value,
        });
    }

    @boundMethod
    public setNumberValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({
            [e.target.id]: e.target.valueAsNumber,
        } as any);
    }

    @boundMethod
    public setNotes(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        this.setState({
            notes: e.target.value,
        });
    }

    @boundMethod
    public setValidationState(isValid: boolean) {
        // if (isValid === this.state.isValid) {
        //     return;
        // }

        const input = this.requiredInput.current!;
        if (isValid) {
            input.setCustomValidity("");
        } else {
            input.setCustomValidity("invalid");
        }

        this.setState({isValid});
    }

    @boundMethod
    public onSubmit() {
        this.setState({success: true});
    }

    @boundMethod
    public resetForm() {
        this.setState({...DEFAULT_STATE, success: undefined});
    }

    public render() {
        const state = this.state;

        return !state.success ? (
            <ValidatedForm onSubmit={this.onSubmit} focusOnMount={false}>
                {this.renderInputs()}

                <FunctionTest
                    type={PropertyTypes.Viscosity}
                    function={state.formula}
                    minWavelength={state.minWavelength}
                    maxWavelength={state.maxWavelength}
                    minTemperature={state.minTemperature}
                    maxTemperature={state.maxTemperature}
                    onEvaluated={this.setValidationState}
                />

                {this.renderActions()}
            </ValidatedForm>
        ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <SubmitInfo onClose={this.resetForm} />
            </div>
        );
    }

    private renderFormulaNotes() {
        return (
            <span className="form-text text-muted">Use T for temperature.</span>
        );
    }

    // TODO: Only show one error message at a time
    private renderInvalidError() {
        const state = this.state;

        const input = this.requiredInput.current;
        if (!input) {
            return null;
        }
        const form = input.form;
        if (!form) {
            return null;
        }

        const wasValidated = form.classList.contains("was-validated");

        if (wasValidated) {
            return null;
        }

        return state.formula !== "" && !state.isValid ? (
            <small className="form-text text-danger">
                Function is invalid!!!
            </small>
        ) : null;
    }

    private renderInputs() {
        const state = this.state;

        return (
            <div className="modal-body">
                <div className="form-group row">
                    <label className="col-3 required" htmlFor="function-2">
                        Function
                    </label>
                    <div className="col">
                        <input
                            ref={this.requiredInput}
                            type="text"
                            id="function-2"
                            className="form-control"
                            required={true}
                            value={state.formula}
                            onChange={this.setFormula}
                        />
                        <div className="invalid-feedback">
                            {state.formula === ""
                                ? "Function is missing"
                                : "Function is invalid!"}
                        </div>
                        {this.renderInvalidError()}
                        {this.renderFormulaNotes()}
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-3" htmlFor="minTemp-2">
                        Minimum Temperature
                    </label>
                    <div className="col-3">
                        <input
                            type="number"
                            className="form-control"
                            id="minTemp-2"
                            min={-273}
                            max={499}
                            value={state.minTemperature}
                            onChange={this.setNumberValue}
                        />
                    </div>

                    <label className="col-3" htmlFor="maxTemp">
                        Maximum Temperature
                    </label>
                    <div className="col-3">
                        <input
                            type="number"
                            className="form-control"
                            id="maxTemperature"
                            min={-272}
                            max={500}
                            value={state.maxTemperature}
                            onChange={this.setNumberValue}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-3" htmlFor="notes">
                        Source / Comments
                    </label>
                    <div className="col">
                        <textarea
                            id="notes"
                            className="form-control"
                            value={state.notes}
                            onChange={this.setNotes}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private renderActions() {
        return (
            <div className="modal-footer d-flex justify-content-between">
                <RequiredInfo />
                <div>
                    <button type="submit" className="btn btn-primary mr-2">
                        <FontAwesomeIcon icon={faEdit} fixedWidth={true} />{" "}
                        Apply
                    </button>

                    <CancelButton>Close</CancelButton>
                </div>
            </div>
        );
    }
}

export default MultiFormLive;
