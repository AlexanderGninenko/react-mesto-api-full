import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [values, setValues] = useState({});

  React.useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [currentUser, props.isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        className="popup__input popup__input_profile_name"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Введите имя"
        required
        onChange={handleChange}
        value={values.name || ''}
      ></input>
      <span className="profile-name-input-error popup__input-error"></span>
      <input
        id="profile-status-input"
        className="popup__input popup__input_profile_status"
        type="text"
        name="description"
        minLength="2"
        maxLength="200"
        placeholder="Введите статус"
        required
        onChange={handleChange}
        value={values.description || ''}
      ></input>
      <span className="profile-status-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
