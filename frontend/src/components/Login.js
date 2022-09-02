import AuthWithForm from "./AuthWithForm";

const Login = ({ onLogin, isLoading }) => {

  return (
    <AuthWithForm title='Вход' onAuth={onLogin} >
      <button className="auth__button" type='submit' disabled={isLoading}>
        {isLoading ? "Входим..." : "Войти"}
      </button>
      </AuthWithForm>
  );
};

export default Login;
