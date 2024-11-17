import React from "react";

export const AlertType = {
    Success: 'Success',
    Warning: 'Warning',
    Error: 'Error',
};

export default class AlertBoxContainer extends React.Component {
    render() {
        if (this.props.alertType == AlertType.Success) {
            return(<SuccessAlertBox {...this.props}/>);
        }

        if (this.props.alertType == AlertType.Warning) {
            return(<WarningAlertBox {...this.props}/>);
        }

    }
}

class AlertBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iconSrc: "https://cdn.lordicon.com/oqdmuxru.json",
            iconColor: "primary:#16c72e",
        };
    }

    render() {
        return(
            
            <div className="AlertBox">
                <lord-icon
                    src = {this.state.iconSrc}
                    trigger = "hover"
                    colors = {this.state.iconColor}
                    >
                </lord-icon>
                <h2>{this.props.alertTitle}</h2>
                <p>{this.props.alertMessage}</p>
                <button>Ok</button>
            </div>
        );
    }
}

class SuccessAlertBox extends AlertBox{
    constructor(props) {
        super(props);
        this.state = {
            iconSrc: "https://cdn.lordicon.com/oqdmuxru.json",
            iconColor: "primary:#16c72e",
        };
    }
}

class WarningAlertBox extends AlertBox{
    constructor(props) {
        super(props);
        this.state = {
            iconSrc: "https://cdn.lordicon.com/vihyezfv.json",
            iconColor: "primary:#f4f19c",
        };
    }
}