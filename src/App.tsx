import React from "react";
import {hot} from "react-hot-loader/root";

import SingleForm from "./components/SingleForm";
import MultiForm from "./components/MultiForm";
import ModalWrapper from "./components/shared/ModalWrapper";
import MultiFormLiveCurrent from "./components/MultiFormLiveCurrent";

class App extends React.Component {
    render() {
        const cardClass = "m-2 p-3 border shadow rounded";
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Current state</h1>
                    </div>
                    <div className="col">
                        <h1>Proposal</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        <h3>Single-line Form</h3>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <SingleForm currentState={true} />
                    </div>
                    <div className={`col ${cardClass}`}>
                        <SingleForm currentState={false} />
                    </div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <SingleForm currentState={true} />
                        </ModalWrapper>
                    </div>
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <SingleForm currentState={false} />
                        </ModalWrapper>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col">
                        <h3>Multi-line Form</h3>
                        <div className="text-muted">
                            With validation before submit
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <MultiForm currentState={true} />
                    </div>
                    <div className={`col ${cardClass}`}>
                        <MultiForm currentState={false} />
                    </div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <MultiForm currentState={true} />
                        </ModalWrapper>
                    </div>
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <MultiForm currentState={false} />
                        </ModalWrapper>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="text-muted">With live validation</div>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <MultiFormLiveCurrent />
                    </div>
                    <div className={`col ${cardClass}`}></div>
                </div>
            </div>
        );
    }
}

export default hot(App);
