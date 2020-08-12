import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {boundMethod} from "autobind-decorator";
import $ from "jquery"; // TODO: use jQuery slim once Bootstrap has been forced to use jQuery slim
import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/js/src/modal";

export interface IModalProps {
    /**
     * Sets to true to automatically focus the first input when modal is shown.
     */
    autoFocus?: boolean;
    centered?: boolean;
    header?: React.ReactNode;
    size?: "sm" | "lg" | "xl";

    onClose(): void;
}

let container: HTMLDivElement;
function getModalContainer() {
    if (container) {
        return container;
    }

    container = document.createElement("div");
    document.getElementById("root")!.appendChild(container);

    return container;
}

class Modal extends React.Component<IModalProps> {
    private readonly root = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        const root = this.root.current!;

        const root$ = $(root);
        root$.on("hidden.bs.modal", this.onModalClosed);

        const autoFocus = this.props.autoFocus !== false;
        if (autoFocus) {
            root$.on("shown.bs.modal", () => {
                const firstInput = root.querySelector("input");
                if (firstInput) {
                    firstInput.focus();
                }
            });
        }

        root$.modal({
            focus: !autoFocus,
        });
    }

    public componentWillUnmount() {
        $(this.root.current!)
            .removeClass("fade")
            .off("shown.bs.modal")
            .off("hidden.bs.modal")
            .modal("hide")
            .modal("dispose");
    }

    @boundMethod
    public onModalClosed() {
        this.props.onClose();
    }

    /** Triggers the modal close animation */
    public triggerClose() {
        const root = this.root.current;
        if (!root) {
            return;
        }

        $(root).modal("hide");
    }

    public render() {
        const {size, centered} = this.props;
        let className = "modal-dialog";

        if (size) {
            className += " modal-" + size;
        }

        if (centered) {
            className += " modal-dialog-centered";
        }

        return ReactDOM.createPortal(
            <div
                className="modal fade"
                tabIndex={-1}
                role="dialog"
                ref={this.root}
            >
                <div className={className} role="document">
                    <div className="modal-content">
                        {this.renderHeader()}
                        {this.props.children}
                    </div>
                </div>
            </div>,
            getModalContainer(),
        );
    }

    private renderHeader() {
        const header = this.props.header;
        if (!header) {
            return null;
        }

        return (
            <div className="modal-header">
                <h4 className="modal-title">{header}</h4>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export interface ICancelButtonProps {
    text?: string;
}

export const CancelButton: React.FunctionComponent = (props) => (
    <button type="button" data-dismiss="modal" className="btn btn-secondary">
        <FontAwesomeIcon icon={faTimes} fixedWidth={true} />{" "}
        {props.children || "Cancel"}
    </button>
);

export default Modal;
