import { object, string, date, array } from "yup";

export const VALIDATION_SCHEMA = object().shape({
  hof: string().required("Name is required"),
  phone1: string()
    .required("Phone 1 is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  phone2: string()
    .nullable()
    .matches(/^[0-9]*$/, "Must be only digits"),
  email: string().email("Invalid email format").required("Please Enter email"),
  mother_parish: string(),
  address: string().required("Address is required"),
  occupation: string().nullable(),
  dob: date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Date of Birth is required"),
  dom: date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  blood: string().nullable(),
  members: array().of(
    object().shape({
      name: string().required("Member Name is required"),
      relation: string().required("Relation is required"),
      occupation: string().nullable(),
      dob: date()
        .required("Date of birth is required")
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        ),
      dom: date()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        ),
      blood: string().nullable(),
    })
  ),
});

export const RELATION = [
  "Mother",
  "Wife",
  "Son",
  "Daughter-In-Law",
  "Daughter",
  "Grandson",
  "Granddaughter",
];

export const FAMILY_INITIAL = {
  hof: "",
  phone1: "",
  phone2: "",
  email: "",
  mother_parish: "",
  address: "",
  dob: "",
  blood: "",
  occupation: "",
  members: [],
  photo: "",
};

export const BLOOD_GROUP = ["A+", "A-", "B-", "O+", "O-", "AB+", "AB-", "B+"];

export const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZndicnZpeGJtbGFibW96a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MjkxMzgsImV4cCI6MjA0MTMwNTEzOH0.yU8fXAZa_x84GwdVhPVDdLhOWbAa6r2PoHxhnV5ebn0";
