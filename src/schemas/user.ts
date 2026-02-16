import { Role } from "@/enum/enum";
import * as yup from "yup";

export const UserSchema = yup.object({
  name: yup
    .string()
    .min(3)
    .max(25)
    .required("Full name must be at least 3 characters long"),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .required("Password must be at least 8 characters long"),
  role: yup
    .string()
    .oneOf([Role.CITYADMIN, Role.SUPERADMIN], "Invalid role selected")
    .required("Please select a role")
});

export const UsersSchema = yup.object({
  name: yup.string().min(3).max(25),
  email: yup.string().email(),
});
