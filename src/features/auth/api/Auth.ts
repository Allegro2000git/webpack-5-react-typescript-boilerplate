import type {LoginInputType} from "../../../shared/types/types";

export const getAuthToken = (loginInputs: LoginInputType): Promise<{ token: string }>  => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (loginInputs.username === 'admin' && loginInputs.password === 'admin') {
                resolve({ token: 'token123' });
            } else {
                reject(new Error('Неверные данные'));
            }
        }, 2000);
    });
};