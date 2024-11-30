import PropTypes from "prop-types";

const FormHeader = ({ formTitle, formDescription }) => {
  return (
    <div>
      <h1 className="text-center text-2xl font-medium">{formTitle}</h1>
      <p className="text-sm font-light">{formDescription}</p>
    </div>
  );
};

FormHeader.propTypes = {
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
};

export default FormHeader;
