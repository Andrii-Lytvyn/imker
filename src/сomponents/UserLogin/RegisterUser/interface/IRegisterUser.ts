import { STATUS } from "../../statusAndRole/status";

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    isLogin: boolean;
    phone: string;
    image: string;
    plz: string;
    secretQuestion?: string;
    // token: string
}
export const initRegisterData = {
    name: "",
    email: "",
    password: "",
    isLogin: false,
    status: STATUS.NOT_CONFIRMED,
    phone: "+49",
    image: "",
    plz: "",
    secretQuestion: "",
    // token: ""
}