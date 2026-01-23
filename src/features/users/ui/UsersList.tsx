import React, {useState} from "react";
import styled from "styled-components";
import {Avatar, Button, List} from "antd";
import {useGetUsers} from "../model/getUsersQuery";
import {useLogoutMutation} from "../../auth/model/useLogoutMutation";
import {useDateFormat} from "../../../shared/hooks/useDateFormat";
import {CreateUserModal} from "../../../shared/components/CreateUserModal";
import {useCreateUserMutation} from "../model/createUserMutation";
import type {CreateUserInput} from "../../../shared/types/types";

export const UsersList = () => {
    const {data} = useGetUsers()
    const logout = useLogoutMutation()
    const { format } = useDateFormat();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const createUser = useCreateUserMutation();

    const handleCreateUser = async (userData: { name: string; avatar?: string }) => {
        const createUserData: CreateUserInput = {
            name: userData.name,
            avatar: userData.avatar || '',
            };
            await createUser.mutateAsync(createUserData);
            setIsModalOpen(false);
    }

    const handleLogout = () => {
        logout.mutate();
    };

    return (
        <Container>
            <Content>
                <ListContainer>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(user) => (
                            <List.Item key={user.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={user.avatar} />}
                                    title={<a href="">{user.name}</a>}
                                    description={
                                    <Description>
                                        Зарегистрирован {format(user.createdAt)}
                                    </Description>}
                                />
                            </List.Item>
                        )}
                    />
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>Создать пользователя</Button>
                </ListContainer>
                <Button type="primary" onClick={handleLogout}>Выход</Button>
            </Content>

            <CreateUserModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateUser}
            />
        </Container>
    );
};

const Container = styled.div`
    margin: 25px 0;
    padding: 25px 50px;
    min-width: 50vw;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Description = styled.span`
    white-space: nowrap;
`;