import React from "react";
import {hot} from "react-hot-loader/root";

import SingleForm from "./components/SingleForm";
import MultiForm from "./components/MultiForm";
import ModalWrapper from "./components/shared/ModalWrapper";
import MultiFormLiveCurrent from "./components/MultiFormLiveCurrent";
import MultiFormLive from "./components/MultiFormLive";

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
                        <SingleForm id={1} currentState={true} />
                    </div>
                    <div className={`col ${cardClass}`}>
                        <SingleForm id={2} currentState={false} />
                    </div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <SingleForm id={3} currentState={true} />
                        </ModalWrapper>
                    </div>
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <SingleForm id={4} currentState={false} />
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
                        <MultiForm id={5} currentState={true} />
                    </div>
                    <div className={`col ${cardClass}`}>
                        <MultiForm id={6} currentState={false} />
                    </div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <MultiForm id={7} currentState={true} />
                        </ModalWrapper>
                    </div>
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <MultiForm id={8} currentState={false} />
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
                        <MultiFormLiveCurrent id={9} />
                    </div>
                    <div className={`col ${cardClass}`}>
                        <MultiFormLive id={10} />
                    </div>
                </div>
                <div className="row">
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <MultiFormLiveCurrent id={11} />
                        </ModalWrapper>
                    </div>
                    <div className={`col ${cardClass}`}>
                        <ModalWrapper>
                            <MultiFormLive id={12} />
                        </ModalWrapper>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(App);
