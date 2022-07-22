import React from 'react';
import LayoutAdmin from '../../../components/LayoutAdmin';
import useUserStore from '../../../store/useUserStore';

const AdminProfile = () => {
  const userStore = useUserStore((state) => state);

  return (
    <LayoutAdmin>
      <div>Profile Page</div>
      {userStore.data ? (
        <table>
          <tr>
            <td>Nama</td>
            <td>{userStore.data.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userStore.data.email}</td>
          </tr>
        </table>
      ) : (
        ''
      )}
    </LayoutAdmin>
  );
};

export default AdminProfile;
