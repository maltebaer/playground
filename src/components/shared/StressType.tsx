import {boundMethod} from "autobind-decorator";
import React from "react";

export enum FractureStressTypes {
    Tensile,
    Shear,
}

interface IStressTypeProps {
    id: string;
    model: FractureStressTypes;
    value: FractureStressTypes;
    onChecked: (value: FractureStressTypes) => void;
}

class StressType extends React.Component<IStressTypeProps> {
    @boundMethod
    public handleCheck(_: React.SyntheticEvent) {
        const props = this.props;
        props.onChecked(props.model);
    }

    public render() {
        const props = this.props;

        return (
            <input
                type="radio"
                name="stressType"
                className="form-check-input"
                id={props.id}
                value={props.model}
                onChange={this.handleCheck}
                checked={props.value === props.model}
            />
        );
    }
}

export default StressType;
