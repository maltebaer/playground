import React from "react";
import {hot} from "react-hot-loader/root";

import SingleForm from "./components/SingleForm";
import MultiForm from "./components/MultiForm";
import ModalWrapper from "./components/shared/ModalWrapper";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Single-line Form</h1>
                <div className="row">
                    <div className="col">
                        <SingleForm currentState={true} />
                    </div>
                    <div className="col">
                        <SingleForm currentState={false} />
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col">
                        <ModalWrapper>
                            <SingleForm currentState={true} />
                        </ModalWrapper>
                    </div>
                    <div className="col">
                        <ModalWrapper>
                            <SingleForm currentState={false} />
                        </ModalWrapper>
                    </div>
                </div>
                <hr />
                <h1>Mulit-line Form</h1>
                <div className="row">
                    <div className="col">
                        <MultiForm currentState={true} />
                    </div>
                    <div className="col">
                        <MultiForm currentState={false} />
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col">
                        <ModalWrapper>
                            <MultiForm currentState={true} />
                        </ModalWrapper>
                    </div>
                    <div className="col">
                        <ModalWrapper>
                            <MultiForm currentState={false} />
                        </ModalWrapper>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(App);
