import PropTypes from "prop-types";
import { forwardRef } from "react";

import Input from "@/components/common/Input";

const FieldWrapper = forwardRef(({ labelName, error, ...props }, ref) => {
  return <Input ref={ref} label={labelName} error={error} {...props} />;
});

FieldWrapper.displayName = "FieldWrapper";

FieldWrapper.propTypes = {
  labelName: PropTypes.string,
  error: PropTypes.string,
};

export default FieldWrapper;
