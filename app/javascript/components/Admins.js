import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getAdmins } from '../utilities/api';

const Admins = ({ history }) => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      const userId = Number(jwtDecode(jwt).id);
      getAdmins(userId, setAdmins);
    }
  }, [admins]);

  return (
    <Layout>
      <div className="tickets p-2">
        <h2 className="mb-4">Administrator(s)</h2>
        {admins.map(admin => (
          <div className="shadow-sm p-3 mb-4 bg-light" key={admin.id}>
            <p>{admin.email}</p>
            <hr />
            <small className="font-italic">
              Became an admin on {Date(admin.updated_at).split('GMT')[0]}
            </small>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Admins;
