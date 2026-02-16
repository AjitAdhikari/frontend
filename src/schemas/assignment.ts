import * as yup from "yup";

export const AssignmentSchema = yup.object({
    consumerId: yup
    .string()
    .required("Consumer is required"),
  caregiverId: yup
    .string()
    .required("Caregiver is required"),
  start_date: yup
    .string()
    .required("Start date is required"),
  end_date: yup
    .string()
    .optional(),
});
