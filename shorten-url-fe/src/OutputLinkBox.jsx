import React from "react";

export default class OutputLinkBox extends React.Component {
  render() {
    return (
      <div className="OutputLinkBox">
        <div className="shortened-link">
          <b>Shortened link</b>
        </div>
        <div className="original-link">original link</div>
      </div>
    );
  }
}
