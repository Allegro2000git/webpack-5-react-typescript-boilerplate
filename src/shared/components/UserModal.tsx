import {Button, Form, Input, Modal} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import type {UserInput} from "../types/types";
import {DEFAULT_AVATAR} from "../constants/constants";

export const UserModal = ({open, onClose, onSubmit, initialValues , title, submitButtonText}: {
    open: boolean; onClose: () => void; onSubmit: (values: UserInput) => Promise<void>,
    initialValues?: UserInput, title: string, submitButtonText: string }) => {

    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            if (initialValues) {
                const avatar = initialValues.avatar || DEFAULT_AVATAR;
                form.setFieldsValue({
                    name: initialValues.name || "anonymous",
                    avatar
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, initialValues, form]);

    const handleSubmit = async () => {
            try {
                setIsSubmitting(true);
                const values = await form.validateFields();
                await onSubmit(values);
                form.resetFields();
            } finally {
                setIsSubmitting(false);
            }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        form.resetFields();
        onClose();
    };


    return (
        <Modal
            title={title}
            open={open}
            onCancel={handleClose}
            footer={null}
            closable={!isSubmitting}
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
                    <Input disabled={isSubmitting}/>
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
                        disabled={isSubmitting}
                    />
                </Form.Item>

                <FooterContainer>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                    >
                        {submitButtonText}
                    </Button>
                    <Button onClick={handleClose} disabled={isSubmitting}>
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
