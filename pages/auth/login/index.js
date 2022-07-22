import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';
import { loginApi } from '../../../api/auth.api';
import jsCookie from 'js-cookie';
import Layout from '../../../components/Layout';
import Router from 'next/router';

export default function LoginPage() {
  const [form] = Form.useForm();

  const loginMutation = useMutation((params) => {
    const { email, password } = params;
    return loginApi({
      email,
      password,
    });
  });

  const handleSubmit = (formData) => {
    const { email, password } = formData;
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          jsCookie.set('accessToken', data.token);
          jsCookie.set('userRole', data.role);
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
    <Layout>
      <div className="max-w-screen-sm mx-auto py-10">
        <h3 className="text-center">Login</h3>
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
              rules={[{ type: 'email', required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ type: 'text', required: true }]}
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
                loading={loginMutation.isLoading && !loginMutation.isError}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center">
            <Link href="/auth/register">
              <a>Register</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
