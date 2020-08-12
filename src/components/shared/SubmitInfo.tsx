import {boundMethod} from "autobind-decorator";
import $ from "jquery";
import React from "react";

interface ISubmitInfoProps {
    onClose(): void;
}

class SubmitInfo extends React.PureComponent<ISubmitInfoProps> {
    @boundMethod
    public onClose(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();

        $().alert("close");

        this.props.onClose();
    }

    public render() {
        return (
            <div
                className="alert alert-info alert-dismissible fade show text-dark"
                role="alert"
            >
                <strong>Submitted!</strong> Let's hope for the best.
                <button
                    type="button"
                    className="close"
                    onClick={this.onClose}
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default SubmitInfo;
