import * as yup from "yup";

export const LocationSchema = yup.object({
  state: yup
    .string()
    .min(3)
    .max(25)
    .required("State name must be at least 3 characters long"),
  city: yup
    .string()
    .min(5)
    .max(100)
    .required("Please enter a city name"),
  // contact_info: yup
  //   .string()
  //   .required("Please enter your contact number")
  //   .test(
  //     "is-valid-contact",
  //     "Contact number must be a valid 10-digit number",
  //     (value) => {
  //       return !value || (/^\d+$/.test(value) && value.length === 10);
  //     },
  //   ),
});
