import { Button, Input, Table, Row, Col, Pagination } from 'antd';
import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Layout from '../../components/Layout';
import { deleteUserApi, fetchUserApi } from '../../api/user.api';
import Router, { useRouter } from 'next/router';
import useUpdateQueryStringFromObjectChange from '../../hooks/useUpdateQueryStringFromObjectChange';

export async function getServerSideProps(context) {
  const { query } = context;
  const { page, search, limit } = query;

  return {
    props: {
      page: page ? Number(page) : 1,
      search: search ? String(search) : '',
      limit: limit ? Number(limit) : 15,
    },
  };
}

const UserPage = (initialProps) => {
  const [data, setData] = useState([]);

  const router = useRouter();

  const [filter, setFilter] = useState({
    page: initialProps.page,
    limit: initialProps.limit,
    search: initialProps.search,
  });

  useUpdateQueryStringFromObjectChange(filter);

  const [total, setTotal] = useState(0);

  const query = useQuery(
    ['query-user-list', filter],
    () =>
      fetchUserApi({
        page: filter.page,
        search: filter.search,
      }),
    {
      initialData: null,
      onSuccess: (data) => {
        setData(data.data);
        setTotal(data.total);
      },
    }
  );

  const mutationDelete = useMutation((params) => deleteUserApi(params.id));

  const handleDeleteUser = (id) => {
    mutationDelete.mutate(
      { id },
      {
        onSuccess: () => {
          query.refetch();
        },
        onError: (error) => {
          console.log('error', error);
        },
      }
    );
  };

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        title: 'ID',
        width: 180,
        render: (value) => {
          return <div className="">{value}</div>;
        },
      },
      {
        dataIndex: 'name',
        title: 'Name',
        width: 200,
        render: (value) => {
          return <div className="">{value}</div>;
        },
      },
      {
        dataIndex: 'email',
        title: 'Email',
        width: 200,
        render: (value) => {
          return <div className="">{value}</div>;
        },
      },
      {
        dataIndex: 'action',
        title: 'Action',
        width: 120,
        fixed: 'right',
        render: (value, row) => {
          return (
            <div className="">
              <div className="flex flex-col gap-1">
                <Button
                  type="default"
                  onClick={() => Router.push(`/user/edit/${row.id}`)}
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    if (window.confirm('are you sure?')) {
                      handleDeleteUser(row.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Layout>
      <div className="p-3">
        <h1>User CRUD</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Input.Search
              allowClear
              placeholder="Cari"
              onSearch={(e) => {
                setFilter((state) => ({
                  ...state,
                  search: e,
                  page: 1,
                }));
              }}
              defaultValue={filter.search}
            />
          </Col>
          <Col xs={24} md={12}>
            <Button
              type="primary"
              onClick={() => {
                Router.push('/user/create');
              }}
            >
              Tambah User
            </Button>
          </Col>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: 420 }}
              loading={query.isFetching || query.isLoading}
              style={{ minHeight: 420 }}
            />
            <div className="mt-2">
              <Pagination
                current={filter.page}
                onChange={(page, pageSize) => {
                  setFilter((state) => ({
                    ...state,
                    page,
                    limit: pageSize,
                  }));
                }}
                total={total}
                pageSize={filter.limit}
                showSizeChanger={true}
                pageSizeOptions={[5, 15, 20, 100]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default UserPage;
