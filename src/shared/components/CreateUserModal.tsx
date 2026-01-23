import {Button, Form, Input, Modal} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import styled from "styled-components";
import React from "react";
import type {CreateUserInput} from "../types/types";

export const CreateUserModal = ({open, onClose, onSubmit}: { open: boolean; onClose: () => void; onSubmit: (values: CreateUserInput) => Promise<void>}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await onSubmit(values);
            form.resetFields();
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    };


    return (
        <Modal
            title="Создание пользователя"
            open={open}
            onCancel={handleClose}
            footer={null}
            width={500}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                requiredMark="optional"
                onFinish={handleSubmit}
            >

                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        { required: true, message: 'Ввведите имя' },
                        { min: 2, message: 'Имя должно содержать минимум 2 символа' },
                        { max: 30, message: 'Имя не должно превышать 30 символов' },
                        {
                            pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
                            message: 'Имя может содержать только буквы, пробелы и дефисы'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватарку"
                    name="avatar"
                    rules={[
                        {   pattern: /\.(jpg|jpeg|png|gif|webp)$/i,
                            message: 'Недопустимый формат изображения. Используйте jpg, png, gif или webp'
                        }
                    ]}
                    extra="Необязательное поле. Допустимые форматы: jpg, png, gif, webp"
                >
                    <Input
                        prefix={<LinkOutlined />}
                        allowClear
                    />
                </Form.Item>

                <FooterContainer>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Создать
                    </Button>
                    <Button onClick={handleClose}>
                        Отмена
                    </Button>
                </FooterContainer>
            </Form>
        </Modal>
    );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
