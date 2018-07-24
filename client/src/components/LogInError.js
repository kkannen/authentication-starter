import React, { Component } from 'react';


class LogInError extends Component {
    errorStyle = {
        backgroundColor: "#C8603D77",
        color: "#C8603D",
        height: "3em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #C8603D",
        borderRadius: 1,
    }

    render() {
        return (
        <div className="LogInError" style={this.errorStyle}>
            <h3>{this.props.error}</h3>
        </div>
        );
    }
}

export default LogInError;