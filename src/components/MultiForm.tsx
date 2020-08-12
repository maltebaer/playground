import {boundMethod} from "autobind-decorator";
import React from "react";

import SubmitInfo from "./shared/SubmitInfo";
import ValidatedForm, {RequiredInfo} from "./shared/ValidatedForm";

interface IMulitFormProps {
    useValidation: boolean;
}

interface IMulitFormState {
    name: string;
    email: string;
    phone?: number;
    success?: boolean;
}

class MulitForm extends React.PureComponent<IMulitFormProps, IMulitFormState> {
    public readonly state: IMulitFormState = {
        name: "",
        email: "",
    };

    @boundMethod
    public setName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({name: e.target.value});
    }
    @boundMethod
    public setEmail(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({email: e.target.value});
    }
    @boundMethod
    public setPhone(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        const phone = Number(e.target.value);
        if (isNaN(phone)) {
            return;
        }

        this.setState({phone});
    }

    @boundMethod
    public onSubmit() {
        this.setState({success: true});
    }

    @boundMethod
    public resetForm() {
        this.setState({
            name: "",
            email: "",
            phone: undefined,
            success: false,
        });
    }

    public render() {
        const state = this.state;

        return !state.success ? (
            this.props.useValidation ? (
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
                    <div className="form-group">
                        <label htmlFor="email" className="required">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required={true}
                            value={state.email}
                            onChange={this.setEmail}
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Please provide a valid Email address!
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            pattern="[0-9]{6}"
                            value={state.phone}
                            onChange={this.setPhone}
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Please provide a 6-digit phone number!
                        </div>
                    </div>
                    <RequiredInfo />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </ValidatedForm>
            ) : (
                <form onSubmit={this.onSubmit} noValidate={true}>
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
                    <div className="form-group">
                        <label htmlFor="email" className="required">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required={true}
                            value={state.email}
                            onChange={this.setEmail}
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Please provide a valid Email-address!
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            pattern="[0-9]{6}"
                            value={state.phone}
                            onChange={this.setPhone}
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Please provide a 6-digit phone number!
                        </div>
                    </div>
                    <RequiredInfo />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={state.name === "" || state.email === ""}
                    >
                        Submit
                    </button>
                </form>
            )
        ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <SubmitInfo onClose={this.resetForm} />
            </div>
        );
    }
}

export default MulitForm;
