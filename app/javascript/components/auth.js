import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const redirectAuth = (history, userType) => {
  if (userType === 'Client') {
    history.push('/dashboard');
  } else if (userType === 'Agent') {
    history.push('/agent-dashboard');
  } else if (userType === 'Admin') {
    history.push('/admin-dashboard');
  }
};

const login = (state, setLoginError, history) => {
  Axios.post('/api/v1/tokens', state)
    .then(res => {
      localStorage.setItem('jwt', res.data.jwt);
      const user = jwtDecode(res.data.jwt);
      const userType = user.type;
      redirectAuth(history, userType);
    })
    .catch(err => {
      if (err) setLoginError('Wrong email or password');
      setTimeout(() => {
        setLoginError('');
      }, 4000);
    });
};

const signUp = (state, setSignUpError, history) => {
  Axios.post('/api/v1/users', state)
    .then(res => {
      localStorage.setItem('jwt', res.data.jwt);
      const user = jwtDecode(res.data.jwt);
      const userType = user.type;
      redirectAuth(history, userType);
    })
    .catch(err => {
      if (err) setSignUpError('You already have an account, please sign in');
      setTimeout(() => {
        setSignUpError('');
      }, 4000);
    });
};

const logOut = () => {
  localStorage.removeItem('jwt');
};

export { login, signUp, logOut, redirectAuth };
