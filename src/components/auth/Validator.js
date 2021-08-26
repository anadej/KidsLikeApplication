import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .required("errRequired")
    .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i, "errEmailMatches"),
  password: Yup.string()
    .required("errRequired")
    .min(8, "errPasswordMin")
    .matches(/(?=.*[0-9])/, "errPasswordMatches"),
});
