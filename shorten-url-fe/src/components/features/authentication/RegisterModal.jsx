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
import { registerUser } from "@/store/authSlice";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterModal = ({ toggleAuthMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      showToast("Signed up successfully", "success");
    } catch (error) {
      showToast(error, "error");
    }
  };

  return (
    <div>
      <BaseForm action="" onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          formTitle={"Create an account"}
          formDescription={"Introduce your information to sign up."}
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
            labelName={"Username"}
            type="text"
            placeholder="your username"
            error={errors.username?.message}
            {...register("username")}
          />

          <FieldWrapper
            labelName={"Password"}
            type="password"
            minLength="8"
            placeholder="********"
            error={errors.password?.message}
            {...register("password")}
          />

          <FieldWrapper
            labelName={"Confirm password"}
            type="password"
            minLength="8"
            placeholder="********"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        {/*Form submit button*/}
        <Button className="w-full" type="submit" disabled={loading}>
          Sign up
        </Button>

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
