import { Link } from "react-router-dom";
import AuthWithForm from "./AuthWithForm";

const Register = ({ onRegister, isLoading }) => {
  return (
    <AuthWithForm onAuth={onRegister} isLoading={isLoading} title='Регистрация'>
      <button className="auth__button" type='submit' disabled={isLoading}>
        {isLoading ? "Регистрируемся..." : "Зарегистрироваться"}
      </button>
      <span className="auth__sign-in">
        Уже зарегистрированы?{" "}
        <Link className="auth__sign-in" to="/sign-in">
          Войти
        </Link>
      </span>
    </AuthWithForm>
  );
};

export default Register;
