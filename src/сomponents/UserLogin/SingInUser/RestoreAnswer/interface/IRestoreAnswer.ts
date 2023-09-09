
export const initRestoreAnswer = {
    secretQuestion: "",
    secretQuestionAnswer: "",
}

export interface IRestoreAnswer {
    id: number | null;
    email: string;
    secretQuestionAnswer: string;
    secretQuestion: string;
}