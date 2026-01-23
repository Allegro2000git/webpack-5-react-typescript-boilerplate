import {useMutation, useQueryClient} from "@tanstack/react-query";
import {baseApi} from "../../../app/api/base";
import type {CreateUserInput, User} from "../../../shared/types/types";

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserInput) => {
            const res = await baseApi.post<User>('/users', data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
};