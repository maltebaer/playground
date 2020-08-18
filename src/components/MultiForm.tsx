import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";
import {boundMethod} from "autobind-decorator";
import React from "react";

import SubmitInfo from "./shared/SubmitInfo";
import ValidatedForm, {RequiredInfo} from "./shared/ValidatedForm";
import StressType, {FractureStressTypes} from "./shared/StressType";

interface IMulitFormProps {
    id: number;
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
        const props = this.props;
        const state = this.state;

        return !state.success ? (
            props.currentState ? (
                <ValidatedForm onSubmit={this.onSubmit} focusOnMount={false}>
                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label htmlFor={`name-${props.id}`}>Name</label>
                            <input
                                id={`name-${props.id}`}
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
                            <label htmlFor={`material-${props.id}`}>
                                Adherend Material
                            </label>
                            <input
                                id={`material-${props.id}`}
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
                            <label htmlFor={`notes-${props.id}`}>Notes</label>
                            <input
                                id={`notes-${props.id}`}
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
                                        id={`tensile-${props.id}`}
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Tensile}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`tensile-${props.id}`}
                                    >
                                        Tensile Stress
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <StressType
                                        id={`shear-${props.id}`}
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Shear}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`shear-${props.id}`}
                                    >
                                        Shear Stress
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm">
                            <label htmlFor={`mass-${props.id}`}>
                                Mass in g
                            </label>
                            <input
                                type="number"
                                id={`mass-${props.id}`}
                                className="form-control"
                                value={state.mass}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor={`distance-${props.id}`}>
                                Distance in mm
                            </label>
                            <input
                                type="number"
                                id={`distance-${props.id}`}
                                className="form-control"
                                value={state.distance}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor={`area-${props.id}`}>
                                Adhesive area in mm²
                            </label>
                            <input
                                type="number"
                                id={`area-${props.id}`}
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
                            <label
                                htmlFor={`name_${props.id}`}
                                className="required"
                            >
                                Name
                            </label>
                            <input
                                id={`name_${props.id}`}
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
                            <label
                                htmlFor={`material_${props.id}`}
                                className="required"
                            >
                                Adherend Material
                            </label>
                            <input
                                id={`material_${props.id}`}
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
                            <label htmlFor={`notes_${props.id}`}>Notes</label>
                            <input
                                id={`notes_${props.id}`}
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
                                        id={`tensile_${props.id}`}
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Tensile}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`tensile_${props.id}`}
                                    >
                                        Tensile Stress
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <StressType
                                        id={`shear_${props.id}`}
                                        value={state.stressType}
                                        onChecked={this.setStressType}
                                        model={FractureStressTypes.Shear}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`shear_${props.id}`}
                                    >
                                        Shear Stress
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-sm">
                            <label htmlFor={`mass_${props.id}`}>
                                Mass in g
                            </label>
                            <input
                                type="number"
                                id={`mass_${props.id}`}
                                className="form-control"
                                value={state.mass}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor={`distance_${props.id}`}>
                                Distance in mm
                            </label>
                            <input
                                type="number"
                                id={`distance_${props.id}`}
                                className="form-control"
                                value={state.distance}
                                onChange={this.setNumberValue}
                            />
                        </div>

                        <div className="col-sm">
                            <label htmlFor={`area_${props.id}`}>
                                Adhesive area in mm²
                            </label>
                            <input
                                type="number"
                                id={`area_${props.id}`}
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
