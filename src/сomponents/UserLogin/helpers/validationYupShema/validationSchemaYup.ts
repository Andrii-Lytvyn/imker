import * as Yup from "yup";

//схема валидации поля RestorePassword
export const validationSchemaRestorePasswordYup = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .trim(),
});

//схема валидации полей SingUp
export const validationSchemaSingUpYup = Yup.object().shape({
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

//схема валидации полей  Registration
export const validationSchemaRegistrationYup = Yup.object().shape({
    // phone: Yup.string()
    //     .matches(/^\+49\d+$/, '+49 and only digits')
    //     .trim(),
    // plz: Yup.string()
    //     .matches(/^[0-9]+$/, 'Min 5 symbols only digits')
    //     .min(5)
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
    // question: Yup.string()
    //     .min(3, "Question must be at least 3 characters")
    //     .required("Question is required")
    //     .trim(),
    // answer: Yup.string()
    //     .min(3, "Answer must be at least 3 characters")
    //     .required("Answer is required")
    //     .trim(),
});