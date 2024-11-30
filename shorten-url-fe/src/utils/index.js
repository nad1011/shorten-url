import * as yup from "yup";

export const urlSchema = yup.object().shape({
  url: yup.string().url("Must be a valid URL").required("URL is required"),
});

export const validateUrl = async (url) => {
  try {
    const result = await urlSchema.validate({ url });
    return result;
  } catch (error) {
    return error.message;
  }
};
