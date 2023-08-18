import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  dob: yup.date().required("Date of birth is required"),
  nationality: yup.string().trim().required("Nationality is required"),
  voterId: yup.string().trim().required("Voter ID is required"),
});

export type User = yup.InferType<typeof userSchema>;

export const userUpdateSchema = yup.object({
  name: yup.string().trim(),
  dob: yup.date(),
  nationality: yup.string().trim(),
});

export type UserUpdate = yup.InferType<typeof userUpdateSchema>;
