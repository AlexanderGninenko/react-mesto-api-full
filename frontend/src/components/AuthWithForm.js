import { useEffect, useState } from "react";

const AuthWithForm = ({ title, onAuth, children }) => {

  const [values, setValues] = useState({});

  useEffect(()=> setValues({}),[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(values.password, values.email)
    }

  return (
    <form onSubmit={handleSubmit} className="auth">
      <h1 className="auth__title">{title}</h1>
      <input
        name="email"
        onChange={handleChange}
        value={values.email || ""}
        className="auth__input"
        placeholder="Email"
        type='email'
        required
      />
      <input
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        className="auth__input"
        placeholder="Пароль"
        type='password'
        required
      />
      {children}
    </form>
  );
};

export default AuthWithForm;
