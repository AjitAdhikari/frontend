import * as yup from "yup";

export const ConsumerSchema = yup.object({
  ssn: yup
    .string()
    .min(9, "SSN must be at least 9 characters")
    .max(11, "SSN must be at most 11 characters")
    .required("SSN is required"),
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
  dob: yup
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  locationId: yup
    .string()
    .required("Location is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone_number: yup
    .string()
    .matches(/^\d{10,15}$/, "Phone number must be 10-15 digits")
    .required("Phone number is required"),
  city: yup
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters")
    .required("City is required"),
  zip_code: yup
    .string()
    .matches(/^\d{5,10}$/, "Zip code must be 5-10 digits")
    .required("Zip code is required"),
  home_address: yup
    .string()
    .min(5, "Home address must be at least 5 characters")
    .max(100, "Home address must be at most 100 characters")
    .required("Home address is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Invalid status selected")
    .required("Status is required"),
    document: yup
    .mixed()
    .nullable(),
});