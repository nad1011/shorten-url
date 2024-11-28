import PropTypes from "prop-types";

const FormFooter = ({ message, linkText }) => {
  return (
    <div className="text-sm font-light">
      <span>{message}</span>
      <a href="" className="text-primary hover:underline">
        {linkText}
      </a>
    </div>
  );
};

FormFooter.propTypes = {
  message: PropTypes.string,
  linkText: PropTypes.string,
};

export default FormFooter;
