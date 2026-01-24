import {useState} from "react";
import type {User, UserInput} from "../types/types";
import {useCreateUserMutation} from "../../features/users/model/createUserMutation";
import {useUpdateUserMutation} from "../../features/users/model/updateUserMutation";

export const useUserModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const createUser = useCreateUserMutation();
    const updateUser = useUpdateUserMutation();

    const handleCreateClick = () => {
        setModalMode('create');
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (user: User) => {
        setModalMode('edit');
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSubmit = async (values: UserInput) => {
        if (modalMode === 'create') {
            await createUser.mutateAsync(values);
        } else if (modalMode === 'edit' && selectedUser) {
            await updateUser.mutateAsync({id: selectedUser.id, ...values});
        }
        handleClose();
    }

    const getModalProps = () => ({
        open: isModalOpen,
        onClose: handleClose,
        onSubmit: handleSubmit,
        title: modalMode === 'create' ? 'Создание пользователя' : 'Редактирование пользователя',
        submitButtonText: modalMode === 'create' ? 'Создать' : 'Сохранить',
        initialValues: modalMode === 'edit' && selectedUser ? {
            name: selectedUser.name,
            avatar: selectedUser.avatar
        } : undefined
    });

    return {
        isModalOpen,
        modalMode,
        selectedUser,
        handleCreateClick,
        handleEditClick,
        handleClose,
        handleSubmit,
        getModalProps
    };
};