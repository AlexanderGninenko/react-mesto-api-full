import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(()=> {
    avatarRef.current.value = "";
  },[props.isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      buttonText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="userAvatar"
        type="url"
        className="popup__input popup__input_data_about"
        id="userAvatar-input"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      ></input>
      <span className="popup__input-error userAvatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
