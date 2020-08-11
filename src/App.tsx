import * as React from "react";
import {hot} from "react-hot-loader/root";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Hello world</h1>
                <button type="button" className="btn btn-primary">
                    This is a bootstrap button
                </button>
            </div>
        );
    }
}

export default hot(App);
