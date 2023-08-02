export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    isLogin: boolean;
    phone: string;
    image: string;
    plz: string;
    question?: string;
    // token: string
}
export const initRegisterData = {
    name: "",
    email: "",
    password: "",
    isLogin: false,
    phone: "+49",
    image: "",
    plz: "",
    question: "",
    // token: ""
}