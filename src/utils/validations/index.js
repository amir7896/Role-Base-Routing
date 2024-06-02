import * as yup from "yup";

// Signup validation object
const singUpValidation = {
  userName: "User name is required",
  email: "Email is required",
  password: "Password is required",
  validEmail: "Provide a valid email",
};

// Signin validation schema
export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(singUpValidation.email)
    .email(singUpValidation.validEmail),
  password: yup.string().required(singUpValidation.password),
});

// Signup validation schema
export const signUpValidationSchema = yup.object().shape({
  userName: yup.string().required(singUpValidation.userName),
  email: yup
    .string()
    .required(singUpValidation.email)
    .email(singUpValidation.validEmail),
  password: yup.string().required(singUpValidation.password),
});
