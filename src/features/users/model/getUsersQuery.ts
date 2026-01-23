import {useQuery} from "@tanstack/react-query";
import {baseApi} from "../../../app/api/base";
import type {User} from "../../../shared/types/types";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        enabled: Boolean(localStorage.getItem('auth_token')),
        queryFn: async () => {
            const response = await baseApi.get<User[]>('/users');
            return response.data;
        },
    });
};