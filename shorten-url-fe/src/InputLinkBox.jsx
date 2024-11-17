import React from "react";

export default class InputLinkBox extends React.Component {
  render() {
    return (
      <div className="InputLinkBox">
        <input type="text" placeholder="Enter long link here" />
        <button>Shorten URL</button>
      </div>
    );
  }
}
