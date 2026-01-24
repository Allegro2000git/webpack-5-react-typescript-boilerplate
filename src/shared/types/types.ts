export type LoginInputType = {
    username: string;
    password: string;
}

export type User = {
    id: string
    createdAt: string
    name: string
    avatar: string
}
export type UserInput = Omit<User, 'id' | 'createdAt'>;