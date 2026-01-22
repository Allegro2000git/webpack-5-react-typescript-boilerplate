import {useMutation} from "@tanstack/react-query";
import {getAuthToken} from "../api/Auth";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: getAuthToken,
        onSuccess: (data) => {
            localStorage.setItem('auth_token', data.token);
        },
        onError: (error: Error) => {
            console.error('Ошибка авторизации:', error.message);
        },
    });
};