export interface ISignInUser {
    email: string;
    password: string;
    isLogin: boolean;
    secretQuestion?: string;
}
export const initialSingInUser = {
    email: "",
    password: "",
    isLogin: false,
    secretQuestion: "",
}