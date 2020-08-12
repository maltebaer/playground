import {boundMethod} from "autobind-decorator";
import React from "react";

export interface IValidatedFormProps {
    id?: string;
    focusOnMount?: boolean;
    onSubmit(form: HTMLFormElement): void;
}

interface IValidatedFormState {
    showErrors: boolean;
}

class ValidatedForm extends React.Component<
    IValidatedFormProps,
    IValidatedFormState
> {
    public readonly state: IValidatedFormState = {
        showErrors: false,
    };

    private readonly form = React.createRef<HTMLFormElement>();

    @boundMethod
    public async handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const form = this.form.current!;
        if (!form.checkValidity()) {
            this.setState({
                showErrors: true,
            });

            const error = form.querySelector(
                "input:invalid, select:invalid",
            ) as HTMLInputElement | null;
            if (error) {
                error.focus();
            }

            return;
        }

        this.props.onSubmit(form);
    }

    public componentDidMount() {
        const focusOnMount = this.props.focusOnMount !== false;
        if (!focusOnMount) {
            return;
        }

        const firstInput = this.form.current!.querySelector("input");
        if (firstInput) {
            firstInput.focus();
        }
    }

    public render() {
        const props = this.props;

        return (
            <form
                ref={this.form}
                noValidate={true}
                id={props.id}
                onSubmit={this.handleSubmit}
                className={this.state.showErrors ? "was-validated" : undefined}
            >
                {props.children}
            </form>
        );
    }
}

export default ValidatedForm;

export class RequiredInfo extends React.PureComponent {
    public render() {
        return <p id="required-info">Field is required</p>;
    }
}
