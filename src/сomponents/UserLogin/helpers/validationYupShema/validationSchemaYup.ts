import * as Yup from "yup";

//схема валидации полей 
export const validationSchemaYup = Yup.object().shape({
    // name: Yup.string()
    //     .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Name can only contain letters")
    //     .min(2)
    //     .trim(),
    email: Yup.string()
        .email("Invalid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
        )
        .required("Email is required")
        .trim(),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .trim(),
});