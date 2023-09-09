import * as Yup from "yup";

export const validationSchemaRestorePasswordYup = Yup.object().shape({
    password: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).+$/, "One digit, uppercase letter, one symbol")
        .required("Passwort ist erforderlich")
        .trim(),
});
export const validationSchemaRestoreEmailYup = Yup.object().shape({
    email: Yup.string()
        .email("Ungültige E-Mail")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Ungültiges E-Mail-Format"
        )
        .required("E-Mail ist erforderlich")
        .trim(),
});

export const validationSchemaSingUpYup = Yup.object().shape({
    email: Yup.string()
        .email("Ungültige E-Mail")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Ungültiges E-Mail-Format"
        )
        .required("E-Mail ist erforderlich")
        .trim(),
    password: Yup.string()
        .min(7, "Das Passwort muss mindestens 7 Zeichen lang sein.")
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).+$/, "One digit, uppercase letter, one symbol")
        .required("Passwort ist erforderlich")
        .trim(),
});

export const validationSchemaRegistrationYup = Yup.object().shape({
    phone: Yup.string()
        .matches(/^\+49\d+$/, '+49 und nur Ziffern')
        .trim(),
    plz: Yup.string()
        .matches(/^[0-9]{5}$/, 'Nur 5 Symbole Ziffern')
        .trim(),
    email: Yup.string()
        .email("Ungültige E-Mail")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Ungültiges E-Mail-Format"
        )
        .required("E-Mail ist erforderlich")
        .trim(),
    password: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).+$/, "One digit, uppercase letter, one symbol")
        .required("Passwort ist erforderlich")
        .trim(),
});