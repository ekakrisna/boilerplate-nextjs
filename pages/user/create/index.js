import { Button, Form, Input } from 'antd';
import Router from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import { createUserApi } from '../../../api/user.api';
import Layout from '../../../components/Layout';

const UserCreatePage = () => {
  const [form] = Form.useForm();

  const storeMutation = useMutation((params) => {
    const { email, name, password } = params;
    return createUserApi({
      email,
      name,
      password,
    });
  });

  const handleSubmit = (formData) => {
    const { email, name, password } = formData;
    storeMutation.mutate(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: (data) => {
          Router.push('/user');
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
    <Layout>
      <div className="p-3">
        <h1>Create User</h1>
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
              loading={storeMutation.isLoading && !storeMutation.isError}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default UserCreatePage;
