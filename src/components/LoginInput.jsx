import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-input">
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button type="button" onClick={() => login({ email, password })}>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
