import React from 'react';
import { useMutation, useQuery } from 'react-query';
import Router, { useRouter } from 'next/router';
import { getUserApi, updateUserApi } from '../../../api/user.api';
import { Button, Form, Input } from 'antd';
import Layout from '../../../components/Layout';

const UserEditPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const query = useQuery(['query-user-detail', id], () => getUserApi(id), {
    onSuccess: (data) => {
      const { email, name } = data;
      form.setFieldsValue({
        email,
        name,
      });
    },
    onError: (error) => {},
  });
  const { data } = query;

  const updateMutation = useMutation((params) => {
    const { email, name, password } = params;
    return updateUserApi(id, { email, name, password });
  });

  const handleSubmit = (formData) => {
    const { email, name, password } = formData;
    updateMutation.mutate(
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
            label="New Password"
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
              loading={updateMutation.isLoading && !updateMutation.isError}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default UserEditPage;
