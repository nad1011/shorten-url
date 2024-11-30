import PropTypes from "prop-types";

const FormFooter = ({ message, linkText, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="text-sm font-light">
      <span>{message}</span>
      <a
        href="#"
        className="text-primary hover:underline cursor-pointer"
        onClick={handleClick}
      >
        {linkText}
      </a>
    </div>
  );
};

FormFooter.propTypes = {
  message: PropTypes.string,
  linkText: PropTypes.string,
  onClick: PropTypes.func,
};

export default FormFooter;
