import PropTypes from "prop-types";

import Input from "@/components/common/Input";

const FieldWrapper = ({ labelName, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor="" className="text-sm">
        {labelName}
      </label>
      <Input {...props} />
    </div>
  );
};

FieldWrapper.propTypes = {
  labelName: PropTypes.string,
};

export default FieldWrapper;
