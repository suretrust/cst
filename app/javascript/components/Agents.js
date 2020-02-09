
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getAgents, changeUserType } from '../utilities/api';

const Agents = ({ history }) => {
  const [agents, setAgents] = useState([]);
  const [userId, setUserId] = useState([]);
  const [success, setSucess] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      const userIdd = Number(jwtDecode(jwt).id);
      setUserId(userIdd);
      getAgents(userIdd, setAgents);
    }
  }, []);

  const handlePromotion = e => {
    e.preventDefault();
    const id = e.target.id.split('@@')[1];
    changeUserType(id, userId, 'Admin');
    setSucess("User's status sucessfully updated!");
    setTimeout(() => {
      setSucess('');
    }, 1500);
  };

  const handleDemotion = e => {
    e.preventDefault();
    const id = e.target.id.split('@@')[1];
    // changeUserType(id, userId, 'Client');
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
        <h2 className="mb-4">Agents(s)</h2>
        {agents.map(agent => (
          <div className="shadow-sm p-3 mb-4 bg-light" key={agent.id}>
            <p>{agent.email}</p>
            <hr />
            <button
              onClick={handlePromotion}
              className="btn btn-sm btn-info"
              id={`@@${agent.id}`}
              type="button"
            >
              Promote to admin
            </button>
            <button
              onClick={handleDemotion}
              id={`@@${agent.id}`}
              className="btn btn-sm btn-warning ml-2"
              type="button"
            >
              Demote to client
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Agents;
