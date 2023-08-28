export interface IRegisterUser {
    [key: string]: string
}
export const initRegisterData = {
    name: "",
    email: "",
    password: "",
    phone: "+49",
    plz: "",
    secretQuestion: "",
    answerSecretQuestion: ""
}