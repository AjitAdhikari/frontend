import * as yup from "yup";

export const InsuranceProviderSchema = yup.object({
  name: yup
    .string()
    .min(3)
    .max(25)
    .required("Full name must be at least 3 characters long"),
  
    billing_code: yup
    .string()
    .min(3)
    .max(20)
    .required("Billing code must be at least 3 characters long"),

    contact_info: yup
    .string()
    .min(5)
    .max(50)
    .required("Contact info must be at least 5 characters long"),

    plan_type: yup
    .string()
    .required("Plan Type is required"),
    
    locationId: yup
    .string()
    .uuid("Location must be a valid UUID")
    .required("Location is required"),
});

