import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import { Button } from 'antd';
import useUserStore from '../store/useUserStore';
import { getUserProfileApi } from '../api/profile.api';
import Router from 'next/router';

const Layout = ({ children }) => {
  const [accessToken, setAccesstoken] = useState(null);
  const userStore = useUserStore((state) => state);
  const [userRole, setUserRole] = useState(null);

  const getUserData = async () => {
    try {
      const userData = await getUserProfileApi();
      userStore.setData(userData);
    } catch (error) {
      jsCookie.remove('accessToken');
      jsCookie.remove('userRole');
    }
  };

  useEffect(() => {
    const dataAccessToken = jsCookie.get('accessToken') || null;
    const userRole = jsCookie.get('userRole') || null;
    setAccesstoken(dataAccessToken);
    setUserRole(userRole);
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);

  const navs = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/user',
      label: 'User',
    },
  ];

  const handleLogout = () => {
    jsCookie.remove('accessToken');
    setAccesstoken(null);
    userStore.setData(null);
    Router.push('/');
  };

  return (
    <div className="bg-gray-50 h-full">
      <div className="max-w-screen-md mx-auto bg-white h-full">
        <div className="flex justify-between items-center">
          <ul className="flex gap-1 p-0 m-0">
            {navs.map((nav) => {
              return (
                <li key={nav.path}>
                  <Link href={nav.path} className="">
                    <a className="px-3 py-2 flex items-center justify-center hover:bg-blue-500 bg-white hover:text-white">
                      {nav.label}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          {!accessToken ? (
            <Link href="/auth/login">
              <a className="px-3 py-2 flex items-center justify-center hover:bg-blue-500 bg-white hover:text-white">
                Login
              </a>
            </Link>
          ) : (
            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
        {accessToken && userRole !== 'user' ? (
          <div>403 Unauthorized</div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Layout;
