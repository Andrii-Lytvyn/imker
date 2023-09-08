import axios from "axios";
import { toast } from "react-toastify";
import { IRestorePassword } from "../../SingInUser/RestorePassword/interface/IRestorePassword";
import { IRestoreAnswer } from "../../SingInUser/RestoreAnswer/interface/IRestoreAnswer";
import { IRegisterUser } from "../../RegisterUser/interface/IRegisterUser";
import { IEmail } from "../../SingInUser/interface/ISingInUser";

export const setLoginStatus = (isLogin: boolean) => {
    localStorage.setItem('IMKER', isLogin ? 'true' : 'false');
}

export const getLoginStatus = () => {
    const storedValue = localStorage.getItem('IMKER');
    return storedValue === 'true';
}


export const registerNewUser = async (createNewUser: IRegisterUser) => {
    try {
        const dataNewUser = await axios.post(
            `/api/register`,
            createNewUser
        );
        console.log("🚀  data:", dataNewUser);
        return dataNewUser;
    } catch (error) {
        toast.error(`Ошибка сервера ${error}`);
    }
};

export const singInUser = async (userSingIn: string) => {
    try {
        const data = await axios.post(`/api/login`, userSingIn, {
            withCredentials: true,
        });
        // console.log("🚀  data:", data);
        setLoginStatus(true)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message;
            if (errorMessage) {
                toast.warning(`${errorMessage}`);
            }
        } else {
            console.log("🚀  error:", error);
        }
    }
};
export const logOut = async () => {
    try {
        await axios.post("/api/logout")
        setLoginStatus(false)
    } catch (error) {
        console.log("🚀  error:", error);
    }
}
export const getUserData = async () => {
    try {
        const data = await axios.get(`/api/me`, {
            withCredentials: true,
        });
        // console.log("🚀  getUserData:", data);
        return data;
    } catch (error) {
        console.log("🚀 getUserData error:", error);
    }
};

export const answerToRestore = async (restoreAnswer: IRestoreAnswer) => {
    try {
        const data = await axios.post(
            `/api/question`,
            restoreAnswer
        );
        // console.log("🚀  data:", data);

        return data;
    } catch (error) {
        console.log("🚀  error:", error);
    }
};

export const emailToRestore = async (email: IEmail) => {
    try {
        const data = await axios.post(`/api/questions`, email);
        return data;
    } catch (error) {
        console.log("🚀  error:", error);
    }
};

export const restoreUserPassword = async (newPassword: IRestorePassword) => {
    try {
        const data = await axios.post("/api/restore", newPassword);
        setLoginStatus(true)
        return data;
    } catch (error) {
        console.log("🚀  error:", error);
    }
};


