export interface ISingInForm {
    swichForm: boolean
    setSwichForm: (newValue: boolean) => void;
}

export interface IRestore {
    restorePassword: boolean
    setRestorePassword: (newValue: boolean) => void;
}

export interface IRestoreAndForgot {
    restorePassword: boolean
    setRestorePassword: (newValue: boolean) => void;
    forgot: boolean
    setForgot: (newValue: boolean) => void;
}