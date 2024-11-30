import PropTypes from "prop-types";

import BaseForm from "./BaseForm";
import FieldWrapper from "./FieldWrapper";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";

import Button from "@/components/common/Button";

const RegisterModal = ({ toggleAuthMode }) => {
  return (
    <div>
      <BaseForm action="">
        <FormHeader
          formTitle={"Create an account"}
          formDescription={"Introduce your information to sign up."}
        />

        {/*Form fields*/}
        <div className="flex flex-col gap-5 w-full">
          <FieldWrapper
            labelName={"Email"}
            type="email"
            placeholder="example@gmail.com"
          />

          <FieldWrapper
            labelName={"Password"}
            type="password"
            minLength="8"
            placeholder="********"
          />

          <FieldWrapper
            labelName={"Confirm password"}
            type="password"
            minLength="8"
            placeholder="********"
          />
        </div>

        {/*Form submit button*/}
        <Button className="w-full">Sign up</Button>

        <FormFooter
          message={"Have an account already? "}
          linkText={"Login now"}
          onClick={toggleAuthMode}
        />
      </BaseForm>
    </div>
  );
};
RegisterModal.propTypes = {
  toggleAuthMode: PropTypes.func.isRequired,
};

export default RegisterModal;
