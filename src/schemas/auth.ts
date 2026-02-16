import * as yup from "yup";

export const ChangePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .min(8)
    .max(25)
    .required("Please enter your password"),
  newPassword: yup
    .string()
    .min(8)
    .max(25)
    .required("Please enter your new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match with new password"),
});

export const ForgetPasswordSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
});

export const ResetPasswordSchema = yup.object({
  token: yup.string(),
  password: yup
    .string()
    .min(6)
    .max(25)
    .required("Please enter your new password"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const LogInSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});