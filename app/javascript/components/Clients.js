
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getClients, changeUserType } from '../utilities/api';

const Clients = ({ history }) => {
  const [clients, setClients] = useState([]);
  const [userId, setUserId] = useState(null);
  const [success, setSucess] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      const userIdd = Number(jwtDecode(jwt).id);
      setUserId(userIdd);
      getClients(userIdd, setClients);
    }
  }, []);

  const handleAgentPromotion = e => {
    e.preventDefault();
    const id = e.target.id.split('@@')[1];
    changeUserType(id, userId, 'Agent');
    setSucess("User's status sucessfully updated!");
    setTimeout(() => {
      setSucess('');
    }, 1500);
  };

  return (
    <Layout>
      {success ? (
        <p className="alert alert-success text-center">{success}</p>
      ) : (
        ''
      )}
      <div className="tickets p-2 my-3">
        <h2 className="mb-4">Clients(s)</h2>
        {clients.map(client => (
          <div className="shadow-sm p-3 mb-4 bg-light" key={client.id}>
            <p>{client.email}</p>
            <hr />
            <button
              type="button"
              id={`@@${client.id}`}
              onClick={handleAgentPromotion}
              className="btn btn-sm btn-info"
            >
              Promote to agent
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Clients;
