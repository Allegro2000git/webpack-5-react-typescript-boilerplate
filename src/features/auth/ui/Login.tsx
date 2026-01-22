import React, {useEffect} from 'react';
import {Alert, Button, Form, type FormItemProps, Input, Spin} from 'antd';
import type {LoginInputType} from "../../../shared/types/types";
import {useLoginMutation} from "../model/useLoginMutation";
import { useNavigate } from 'react-router-dom';
import {Path} from "../../../app/routes/Routes";
import styled from "styled-components";


export const Login = () => {
    const navigate = useNavigate();

    const { mutate: login, isPending, isError, error, isSuccess} = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate(Path.users, { replace: true });
        }
    }, [isSuccess, navigate]);

    const onFinish = (inputs: LoginInputType) => {
        login(inputs);
    }

    return (
            <FormCard>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    disabled={isPending}
                >
                    {isError && (
                        <Alert
                            message="ошибка Авторизации"
                            description={error.message}
                            type="error"
                            showIcon
                        />
                    )}

                    {isSuccess && (
                        <Alert
                            message="Успешно"
                            type="success"
                            showIcon
                        />
                     )}

                    <Spin spinning={isPending} tip="Выполняется вход..." size="large">
                    <FormItemSpacing
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Введите имя!' }]}
                    >
                    <Input />
                    </FormItemSpacing>

                    <FormItemSpacing
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                    <Input.Password />

                    </FormItemSpacing>

                    <FormItemSpacing label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItemSpacing>
                    </Spin>
                </Form>
            </FormCard>
    );
};

const FormCard = styled.div`
    width: 400px;
    margin: 250px auto;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const FormItemSpacing: React.FC<FormItemProps> = styled(Form.Item)`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;
