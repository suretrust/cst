import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const login = (state, setLoginError, history) => {
  Axios.post('/tokens', state)
    .then(res => {
      localStorage.setItem('jwt', res.data.jwt);
      const user = jwtDecode(res.data.jwt);
      const userType = user.type;
      if (userType === 'Client') {
        history.push('/dashboard');
      } else if (userType === 'Agent') {
        history.push('/agent-dashboard');
      } else if (userType === 'Admin') {
        history.push('/admin-dashboard');
      }
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
