
export const initRestoreAnswer = {
    secretQuestions: "",
    answer: "",
}

export interface IRestoreAnswer {
    id: number | null;
    email: string;
    answer: string;
    secretQuestions: string;
}