import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';
import { registerApi } from '../../../api/auth.api';
import jsCookie from 'js-cookie';
import Router from 'next/router';

const RegisterPage = () => {
  const [form] = Form.useForm();

  const registerMutation = useMutation((params) => {
    const { email, name, password } = params;
    return registerApi({
      email,
      name,
      password,
    });
  });

  const handleSubmit = (formData) => {
    const { email, name, password } = formData;

    registerMutation.mutate(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: (data) => {
          Router.push('/auth/login');
        },
        onError: (error) => {
          if (error?.response?.status === 422) {
            const errorData = error.response.data?.errors || {};

            const newFields = [];
            const fields = form.getFieldsValue();
            form.setFields([]);
            Object.keys(fields).forEach((key) => {
              newFields.push({
                name: key,
                value: fields[key],
                errors: errorData[key] || [],
              });
            });
            form.setFields(newFields);
          }
        },
      }
    );
  };

  return (
    <div className="max-w-screen-sm mx-auto py-10">
      <h3 className="text-center">Register</h3>
      <div className="p-3 border rounded-lg">
        <Form
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 24 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ type: 'text', required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ type: 'text', required: false }]}
          >
            <Input.Password visibilityToggle />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              onClick={() => {
                form.submit();
              }}
              type="primary"
              className="w-full"
              loading={registerMutation.isLoading && !registerMutation.isError}
            >
              Register Account
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Link href="/auth/login">
            <a>Already have account? Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
