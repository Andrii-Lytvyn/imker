import { ROLE } from "../statusAndRole/role";

export interface IFormData {
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
export const initialFormData = {
    id: null,
    name: "",
    email: "",
    password: "",
    isLogin: false,
    role: ROLE.guest,
    phone: "",
    image: "",
    coordinates: "",
    address: "",
    token: ""
}