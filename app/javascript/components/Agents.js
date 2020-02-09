import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getAgents, changeUserType } from '../utilities/api';
import { setAgents } from '../actions';

const mapStateToProps = state => ({
  agents: state.agents,
});

const mapDispatchToProps = dispatch => ({
  setAgents: agents => dispatch(setAgents(agents)),
});

const Agents = ({ history, agents, setAgents }) => {
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
  }, [handlePromotion, handleDemotion]);

  const handlePromotion = e => {
    e.preventDefault();
    const id = e.target.id.split('@@')[1];
    changeUserType(id, userId, 'Admin', setAgents, null);
    setSucess("User's status sucessfully updated!");
    setTimeout(() => {
      setSucess('');
    }, 1500);
  };

  const handleDemotion = e => {
    e.preventDefault();
    const id = e.target.id.split('@@')[1];
    changeUserType(id, userId, 'Client', setAgents);
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
        {agents.length > 0 ? (
          agents.map(agent => (
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
          ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            There are no agents at this time.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Agents));
