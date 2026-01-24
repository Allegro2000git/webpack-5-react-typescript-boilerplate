import {useMutation, useQueryClient} from "@tanstack/react-query";
import {baseApi} from "../../../app/api/base";
import type {User} from "../../../shared/types/types";

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...data }: Omit<User, 'createdAt'>) => {
            const res = await baseApi.put<User>(`/users/${id}`, data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
};