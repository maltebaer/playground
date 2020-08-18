import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {boundMethod} from "autobind-decorator";
import React from "react";

import {CancelButton} from "./shared/Modal";
import ValidatedForm from "./shared/ValidatedForm";
import FunctionTest, {PropertyTypes} from "./FunctionTest";
import SubmitInfo from "./shared/SubmitInfo";

interface IMultiFormLiveCurrentProps {
    id: number;
}

interface IMultiFormLiveCurrentState {
    formula: string;
    notes: string;

    minTemperature: number;
    maxTemperature: number;

    minWavelength: number;
    maxWavelength: number;

    isValid: boolean;

    success?: boolean;
}

const DEFAULT_STATE: IMultiFormLiveCurrentState = {
    formula: "",
    notes: "",

    maxTemperature: 450,
    maxWavelength: 900,
    minTemperature: 4,
    minWavelength: 60,

    isValid: false,
};

class MultiFormLiveCurrent extends React.PureComponent<
    IMultiFormLiveCurrentProps,
    IMultiFormLiveCurrentState
> {
    public readonly state = DEFAULT_STATE;

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
        if (isValid === this.state.isValid) {
            return;
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

    private renderInvalidError() {
        if (this.state.isValid) {
            return null;
        }

        return (
            <small id="invalid-formula" className="form-text text-danger">
                Function is missing or is invalid!
            </small>
        );
    }

    private renderInputs() {
        const {id} = this.props;
        const state = this.state;

        return (
            <div className="modal-body">
                <div className="form-group row">
                    <label className="col-3" htmlFor={`function-${id}`}>
                        Function
                    </label>
                    <div className="col">
                        <input
                            type="text"
                            id={`function-${id}`}
                            className="form-control"
                            required={true}
                            value={state.formula}
                            onChange={this.setFormula}
                        />
                        {this.renderInvalidError()}
                        {this.renderFormulaNotes()}
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-3" htmlFor={`min-temp-${id}`}>
                        Minimum Temperature
                    </label>
                    <div className="col-3">
                        <input
                            type="number"
                            className="form-control"
                            id={`min-temp-${id}`}
                            min={-273}
                            max={499}
                            value={state.minTemperature}
                            onChange={this.setNumberValue}
                        />
                    </div>

                    <label className="col-3" htmlFor={`max-temp-${id}`}>
                        Maximum Temperature
                    </label>
                    <div className="col-3">
                        <input
                            type="number"
                            className="form-control"
                            id={`max-temp-${id}`}
                            min={-272}
                            max={500}
                            value={state.maxTemperature}
                            onChange={this.setNumberValue}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-3" htmlFor={`notes-${id}`}>
                        Source / Comments
                    </label>
                    <div className="col">
                        <textarea
                            id={`notes-${id}`}
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
            <div className="modal-footer">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!this.state.isValid}
                >
                    <FontAwesomeIcon icon={faEdit} fixedWidth={true} /> Apply
                </button>

                <CancelButton>Close</CancelButton>
            </div>
        );
    }
}

export default MultiFormLiveCurrent;
