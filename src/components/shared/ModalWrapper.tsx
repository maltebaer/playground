import {boundMethod} from "autobind-decorator";
import React from "react";

import Modal from "./Modal";

interface IModalWrapperState {
    showForm: boolean;
}

class ModalWrapepr extends React.PureComponent<{}, IModalWrapperState> {
    public readonly state: IModalWrapperState = {
        showForm: false,
    };

    @boundMethod
    public openModal() {
        this.setState({showForm: true});
    }

    @boundMethod
    public closeModal() {
        this.setState({showForm: false});
    }

    public render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    onClick={this.openModal}
                    className="btn btn-primary"
                >
                    Open form in modal
                </button>

                {this.state.showForm ? (
                    <Modal onClose={this.closeModal} header={"Fill and submit"}>
                        <div className="modal-body">{this.props.children}</div>
                    </Modal>
                ) : null}
            </React.Fragment>
        );
    }
}

export default ModalWrapepr;
