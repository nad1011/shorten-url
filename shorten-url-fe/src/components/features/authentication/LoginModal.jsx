import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import BaseForm from "./BaseForm";
import FieldWrapper from "./FieldWrapper";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";

import Button from "@/components/common/Button";
import useToast from "@/hooks/useToast";
import { loginUser } from "@/store/authSlice";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginModal = ({ toggleAuthMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      showToast("Logged in successfully", "success");
    } catch (error) {
      console.log(error);
      showToast(error, "error");
    }
  };

  return (
    <div>
      <BaseForm action="" onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          formTitle={"Login"}
          formDescription={"Introduce your information to sign in."}
        />

        {/*Form fields*/}
        <div className="flex flex-col gap-4 w-full">
          <FieldWrapper
            labelName={"Email"}
            type="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <FieldWrapper
            labelName={"Password"}
            type="password"
            minLength="8"
            placeholder="********"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        {/*Form submit button*/}
        <Button className="w-full" type="submit" disabled={loading}>
          Login
        </Button>

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
