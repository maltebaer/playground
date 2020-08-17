import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";
import {boundMethod} from "autobind-decorator";
import React from "react";

import SubmitInfo from "./shared/SubmitInfo";
import ValidatedForm, {RequiredInfo} from "./shared/ValidatedForm";
import StressType, {FractureStressTypes} from "./shared/StressType";

interface IMulitFormProps {
    currentState: boolean;
}

interface IMulitFormState {
    name: string;
    notes: string;
    material: string;

    mass: number;
    area: number;
    distance: number;

    stressType: FractureStressTypes;

    success?: boolean;
}

const DEFAULT_STATE: IMulitFormState = {
    area: 78.54,
    distance: 68.35,
    mass: 21.47,
    material: "",
    name: "",
    notes: "",
    stressType: FractureStressTypes.Tensile,
};

class MultiForm extends React.PureComponent<IMulitFormProps, IMulitFormState> {
    public state = DEFAULT_STATE;

    @boundMethod
    public setTextValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({
            [e.target.id]: e.target.value,
        } as any);
    }

    @boundMethod
    public setStressType(stressType: FractureStressTypes) {
        this.setState({stressType});
    }

    @boundMethod
    public setNumberValue(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({
            [e.target.id]: e.target.valueAsNumber,
        } as any);
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
            this.props.currentState ? (
                <ValidatedForm onSubmit={this.onSubmit} focusOnMount={false}>
                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                required={true}
                                value={state.name}
                                onChange={this.setTextValue}
                            />
                            <div className="invalid-feedback">
                                Stamp Name is required!
                            </div>
                        </div>

                        <div className="form-group col-sm">
                            <label htmlFor="material">Adherend Material</label>
                            <input
                                id="material"
                                type="text"
                                className="form-control"
                                required={true}
                                value={state.material}
                                onChange={this.setTextValue}
                            />
                            <div className="invalid-feedback">
                                Adherend Material is required!
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label htmlFor="notes">Notes</label>
                            <input
                                id="notes"
                                type="text"
                                className="form-control"
                                value={state.notes}
                                onChange={this.setTextValue}
                            />
                        </div>

                        <div className="form-group col-sm">
                            <label>Stress Type</label>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <StressType
                                        id="tensile"
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Tensile}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tensile"
                                    >
                                        Tensile Stress
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <StressType
                                        id="shear"
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Shear}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="shear"
                                    >
                                        Shear Stress
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm">
                            <label htmlFor="mass">Mass in g</label>
                            <input
                                type="number"
                                id="mass"
                                className="form-control"
                                value={state.mass}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor="distance">Distance in mm</label>
                            <input
                                type="number"
                                id="distance"
                                className="form-control"
                                value={state.distance}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor="area">Adhesive area in mm²</label>
                            <input
                                type="number"
                                id="area"
                                className="form-control"
                                value={state.area}
                                onChange={this.setNumberValue}
                            />
                        </div>
                    </div>
                    <hr />

                    <div className="d-flex mt-3">
                        <div className="ml-auto">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSave} /> Save
                            </button>{" "}
                            <button type="button" className="btn btn-secondary">
                                <FontAwesomeIcon icon={faTimes} /> Cancel
                            </button>{" "}
                        </div>
                    </div>
                </ValidatedForm>
            ) : (
                <ValidatedForm onSubmit={this.onSubmit} focusOnMount={false}>
                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label htmlFor="name" className="required">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                required={true}
                                value={state.name}
                                onChange={this.setTextValue}
                            />
                            <div className="invalid-feedback">
                                Stamp Name is required!
                            </div>
                        </div>

                        <div className="form-group col-sm">
                            <label htmlFor="material" className="required">
                                Adherend Material
                            </label>
                            <input
                                id="material"
                                type="text"
                                className="form-control"
                                required={true}
                                value={state.material}
                                onChange={this.setTextValue}
                            />
                            <div className="invalid-feedback">
                                Adherend Material is required!
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label htmlFor="notes">Notes</label>
                            <input
                                id="notes"
                                type="text"
                                className="form-control"
                                value={state.notes}
                                onChange={this.setTextValue}
                            />
                        </div>

                        <div className="form-group col-sm">
                            <label>Stress Type</label>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <StressType
                                        id="tensile-2"
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Tensile}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tensile-2"
                                    >
                                        Tensile Stress
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <StressType
                                        id="shear-2"
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Shear}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="shear-2"
                                    >
                                        Shear Stress
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm">
                            <label htmlFor="mass">Mass in g</label>
                            <input
                                type="number"
                                id="mass"
                                className="form-control"
                                value={state.mass}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor="distance">Distance in mm</label>
                            <input
                                type="number"
                                id="distance"
                                className="form-control"
                                value={state.distance}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor="area">Adhesive area in mm²</label>
                            <input
                                type="number"
                                id="area"
                                className="form-control"
                                value={state.area}
                                onChange={this.setNumberValue}
                            />
                        </div>
                    </div>
                    <hr />

                    <div className="d-flex mt-3">
                        <RequiredInfo />
                        <div className="ml-auto">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSave} /> Save
                            </button>{" "}
                            <button type="button" className="btn btn-secondary">
                                <FontAwesomeIcon icon={faTimes} /> Cancel
                            </button>{" "}
                        </div>
                    </div>
                </ValidatedForm>
            )
        ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <SubmitInfo onClose={this.resetForm} />
            </div>
        );
    }
}

export default MultiForm;
