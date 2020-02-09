import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';
import { getClients, changeUserType } from '../utilities/api';
import { setClients } from '../actions';

const mapStateToProps = state => ({
  clients: state.clients,
});

const mapDispatchToProps = dispatch => ({
  setClients: clients => dispatch(setClients(clients)),
});

const Clients = ({ history, clients, setClients }) => {
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
    changeUserType(id, userId, 'Agent', undefined, setClients);
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
        {clients.length > 0 ? (
          clients.map(client => (
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
          ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            There are no clients at this time.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Clients));
