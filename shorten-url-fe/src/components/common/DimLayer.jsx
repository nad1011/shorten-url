import PropTypes from "prop-types";

const DimLayer = ({ canDim = true, onClickOutside }) => {
  if (canDim) {
    return (
      <div
        className="fixed top-0 left-0 w-full h-full bg-foreground/60 z-10"
        onClick={onClickOutside}
      ></div>
    );
  }
};

DimLayer.propTypes = {
  canDim: PropTypes.bool,
  onClickOutside: PropTypes.func.isRequired,
};

export default DimLayer;
