import { object, string, date, array } from "yup";

export const VALIDATION_SCHEMA = object().shape({
  hof: string().required("Name is required"),
  phone1: string()
    .nullable()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(12, "Max 12 Digits"),
  phone2: string()
    .nullable()
    .matches(/^[0-9]*$/, "Must be only digits"),
  email: string().nullable().email("Invalid email format"),

  mother_parish: string(),
  address: string(),
  occupation: string().nullable(),
  dob: date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

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
  { value: "Mother", label: "Mother" },
  { value: "Wife", label: "Wife" },
  { value: "Son", label: "Son" },
  { value: "Daughter-In-Law", label: "Daughter-In-Law" },
  { value: "Daughter", label: "Daughter" },
  { value: "Daughter(Married)", label: "Daughter(Married)" },
  { value: "Grandson", label: "Grandson" },
  { value: "Granddaughter", label: "Granddaughter" },
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

// export const BLOOD_GROUP = ["A+", "A-", "B-", "O+", "O-", "AB+", "AB-", "B+"];

export const BLOOD_GROUP = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "B+", label: "B+" }
];



export const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZndicnZpeGJtbGFibW96a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MjkxMzgsImV4cCI6MjA0MTMwNTEzOH0.yU8fXAZa_x84GwdVhPVDdLhOWbAa6r2PoHxhnV5ebn0";

export const FACTS = [
  "The Mar Thoma presence in Ernakulam began in the early 1930s as part of the Church’s Evangelization efforts through the North Travancore Mission Field.",
  "In 1932, Thengode Kizhakkedath Kunjunju (Varkey Korah) welcomed a mission evangelist into his home, leading to prayer sessions that evolved into a worship service.",
  "The first church was built in 1942 on land donated by Kizhakkedath Varkey Korah, despite having only five families in the congregation.",
  "Sunday School was first introduced by Mr. T.C. Joseph, and Qurbana services were initiated by Rev. E.V. Cherian (now Coorilos Suffragan Metropolitan) in the 1980s.",
  "The foundation for a new church building was laid in 2009 by Coorilos Thirumeni, but financial constraints delayed construction for five years.",
  "In 2014, the present church building was completed through a land exchange agreement with Palarivattom Mar Thoma Church, leading to its consecration by Makarios Thirumeni.",
  "The church has grown from 5 to ~70 families, with Sunday School, Yuvajana Sakhyam, Choir, Edavaka Sanghom, Sevika Sanghom, and Senior Citizens’ Fellowship actively contributing.",
  "The influx of IT professionals and the leadership of John John Achen, Varghese M Easow Achen, and Rev. Vijish Achen strengthened the congregation significantly.",
  "The church continues to flourish spiritually and numerically, growing in faith and fellowship by the grace of God.",
  "The dedication and unity of its members have played a vital role in its development, ensuring that it remains a strong spiritual and community center.",
];


export const users = {
  admin: 'admin1213',
  member: 'member123'
}