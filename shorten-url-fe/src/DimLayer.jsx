import React from "react";
import PropTypes from 'prop-types';

export default class DimLayer extends React.Component {
    render() {
        if (this.props.canDim) {
            return(
                <div className="DimDisplay">
                </div>
            );
        }
        
    }
}

DimLayer.propTypes = {
    canDim: PropTypes.bool,
};

DimLayer.defaultProps = {
    canDim: false,
};