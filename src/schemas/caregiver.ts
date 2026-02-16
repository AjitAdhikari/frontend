import * as yup from "yup";

export const CaregiverSchema = yup.object({
  first_name: yup
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(25, "First name must be at most 25 characters")
    .required("First name is required"),
  last_name: yup
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(25, "Last name must be at most 25 characters")
    .required("Last name is required"),
  locationId: yup
    .string()
    .required("Location is required"),
  certification: yup
    .string()
    .max(50, "Certification must be at most 50 characters")
    .nullable(),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Invalid status selected")
    .required("Status is required"),
});
