import PropTypes from "prop-types";

import BaseForm from "./BaseForm";
import FieldWrapper from "./FieldWrapper";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";

import Button from "@/components/common/Button";

const LoginModal = ({ toggleAuthMode }) => {
  return (
    <div>
      <BaseForm action="">
        <FormHeader
          formTitle={"Login"}
          formDescription={"Introduce your information to sign in."}
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
        </div>

        {/*Form submit button*/}
        <Button className="w-full">Login</Button>

        <FormFooter
          message={"Don't have an account? "}
          linkText={"Register now"}
          onClick={toggleAuthMode}
        />
      </BaseForm>
    </div>
  );
};
LoginModal.propTypes = {
  toggleAuthMode: PropTypes.func.isRequired,
};

export default LoginModal;
