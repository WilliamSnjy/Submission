import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <article className="login-page__main">
        <h2>
          Mari kita
          {' '}
          <strong>Berkomentar</strong>
          !!!
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Tidak punya akun?
          {' '}
          <Link to="/register">Daftar</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
