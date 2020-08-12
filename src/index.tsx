// tslint:disable:ordered-imports
import "./styles/vendors.scss";
import "./styles/customization.scss";

import React from "react";
import ReactDOM from "react-dom";

// TODO: Bootstrap imports full jQuery, force it to import jQuery slim instead
import "bootstrap/js/src/alert";
import "bootstrap/js/src/dropdown";
import "bootstrap/js/src/collapse";
import "bootstrap/js/src/popover";
import "bootstrap/js/src/tab";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
