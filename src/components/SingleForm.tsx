import {boundMethod} from "autobind-decorator";
import React from "react";

import SubmitInfo from "./shared/SubmitInfo";
import ValidatedForm, {RequiredInfo} from "./shared/ValidatedForm";

interface ISingleFormProps {
    currentState: boolean;
}

interface ISingleFormState {
    name: string;
    success?: boolean;
}

class SingleForm extends React.PureComponent<
    ISingleFormProps,
    ISingleFormState
> {
    public readonly state: ISingleFormState = {
        name: "",
    };

    @boundMethod
    public setName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({name: e.target.value});
    }

    @boundMethod
    public onSubmit() {
        this.setState({success: true});
    }

    @boundMethod
    public resetForm() {
        this.setState({
            name: "",
            success: false,
        });
    }

    public render() {
        const state = this.state;

        return !state.success ? (
            this.props.currentState ? (
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            required={true}
                            value={state.name}
                            onChange={this.setName}
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Please provide a name!
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={state.name === ""}
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <ValidatedForm onSubmit={this.onSubmit} focusOnMount={false}>
                    <div className="form-group">
                        <label htmlFor="name" className="required">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required={true}
                            value={state.name}
                            onChange={this.setName}
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Please provide a name!
                        </div>
                    </div>
                    <RequiredInfo />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </ValidatedForm>
            )
        ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <SubmitInfo onClose={this.resetForm} />
            </div>
        );
    }
}

export default SingleForm;
