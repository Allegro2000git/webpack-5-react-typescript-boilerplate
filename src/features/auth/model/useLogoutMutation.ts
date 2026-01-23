import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Path} from "../../../app/routes/Routes";
import {useNavigate} from "react-router-dom";

export const useLogoutMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            queryClient.cancelQueries();
            queryClient.clear();
            localStorage.removeItem('auth_token');
            return new Promise(resolve => setTimeout(resolve, 0));
        },
        onSuccess: () => {
            navigate(Path.login, {replace: true})
        }
    });

};