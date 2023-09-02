
export interface IUserData {
    id: number | null,
    email: string,
    role: string,
    state: string,
    name: string,
    plz: string,
    phone: string,
    image: string,
    isLogin?: boolean
}

export interface ISecretQuestion {
    id: number | null,
    email: string,
    secretQuestions: string[],

}
export const question: ISecretQuestion = {
    id: null,
    email: "",
    secretQuestions: [],

}
export const userData: IUserData = {
    id: null,
    email: "",
    role: "",
    state: "",
    name: "",
    plz: "",
    phone: "",
    image: "",
    // isLogin: false
}