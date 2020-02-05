import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const login = (state, userType, setUserType, setLoginError, history) => {
  Axios.post('/tokens', state)
    .then(res => {
      localStorage.setItem('jwt', res.data.jwt);
      const user = jwtDecode(res.data.jwt);
      setUserType(user.type);
      if (userType === 'Client') history.push('/dashboard');
      if (userType === 'Agent') history.push('/agent-dashboard');
      if (userType === 'Admin') history.push('/admin-dashboard');
    })
    .catch(err => {
      if (err) setLoginError('Wrong email or password');
      setTimeout(() => {
        setLoginError('');
      }, 4000);
    });
};

const signUp = () => {};
const logOut = () => {};

export { login, signUp, logOut };
