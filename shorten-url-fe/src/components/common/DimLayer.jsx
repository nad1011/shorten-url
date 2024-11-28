import PropTypes from "prop-types";

const DimLayer = ({ canDim = true }) => {
  if (canDim) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-10"></div>
    );
  }
};

DimLayer.propTypes = {
  canDim: PropTypes.bool,
};

export default DimLayer;
