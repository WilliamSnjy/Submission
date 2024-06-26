import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ email, name, password }));

    navigate('/login');
  };

  return (
    <section className="register-page">
      <article className="register-page__main">
        <h2>Buat Akun mu!!</h2>
        <RegisterInput register={onRegister} />

        <p>
          Sudah punya akun?
          {' '}
          <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
