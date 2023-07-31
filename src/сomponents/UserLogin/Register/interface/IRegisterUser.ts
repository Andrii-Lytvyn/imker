import { ROLE } from "../../statusAndRole/role";

export interface IRegister {
    id: string | number | null;
    name: string;
    email: string;
    password: string;
    isLogin: boolean;
    role: string;
    phone: string;
    image: string;
    coordinates: string;
    address: string;
    token: string
}
export const initRegisterData = {
    id: null,
    name: "",
    email: "",
    password: "",
    isLogin: false,
    role: ROLE.USER,
    phone: "",
    image: "",
    plz: "",
    address: "",
    token: ""
}