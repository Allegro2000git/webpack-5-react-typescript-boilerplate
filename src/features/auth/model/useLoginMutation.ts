import {useMutation} from "@tanstack/react-query";
import {getAuthToken} from "../api/Auth";
import {Path} from "../../../app/routes/Routes";
import {useNavigate} from "react-router-dom";

export const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: getAuthToken,
        onSuccess: (data) => {
            localStorage.setItem('auth_token', data.token);
            navigate(Path.users, { replace: true });
        },
        onError: (error: Error) => {
            console.error('Ошибка авторизации:', error.message);
        },
    });
};