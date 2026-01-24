import React, {useEffect} from "react";
import styled from "styled-components";
import {Avatar, Button, List} from "antd";
import {useGetUsers} from "../model/getUsersQuery";
import {useLogoutMutation} from "../../auth/model/useLogoutMutation";
import {useDateFormat} from "../../../shared/hooks/useDateFormat";
import {UserModal} from "../../../shared/components/UserModal";
import {useUserModal} from "../../../shared/hooks/useUserModal";
import {DEFAULT_AVATAR} from "../../../shared/constants/constants";

export const UsersList = () => {
    const {data} = useGetUsers()
    const logout = useLogoutMutation()
    const { format } = useDateFormat();
    const userModal = useUserModal();


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
                                    avatar={<Avatar onClick={() => userModal.handleEditClick(user)} src={user.avatar || DEFAULT_AVATAR} style={{cursor: "pointer"}}/>}
                                    title={<span onClick={() => userModal.handleEditClick(user)} style={{cursor: "pointer"}}>{user.name}</span>}
                                    description={
                                    <Description>
                                        Зарегистрирован {format(user.createdAt)}
                                    </Description>}
                                />
                            </List.Item>
                        )}
                    />
                    <Button type="primary" onClick={userModal.handleCreateClick}>Создать пользователя</Button>
                </ListContainer>
                <Button type="primary" onClick={handleLogout}>Выход</Button>
            </Content>

            <UserModal {...userModal.getModalProps()}/>
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