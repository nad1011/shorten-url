import React, { useState } from "react";
import PropTypes from 'prop-types';

export default class TestFetchButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: false, // Initial state for button
        };
    }

    render() {
        return (
            <button 
                onClick={(event) => {
                    OnLoadDataButtonClick();
                }}

                disabled = {this.state.buttonDisabled}
            >
                Fetch data
            </button>
        );
    }


}

function OnLoadDataButtonClick() {
    const url = "http://localhost:3000/";

    let fetchPromise = fetch(url, {
        method: "GET",
    });

    fetchPromise.then((response) => {
        if (response.status !== 200) throw new Error("Failed to fetch data");
        console.log(response);
    });

}
