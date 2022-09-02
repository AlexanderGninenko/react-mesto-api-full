import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  useEffect(() => {
    setValues({ name: "", link: "" });
  }, [props.isOpen]);

  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-name-input"
        className="popup__input popup__input_place_name"
        type="text"
        name="name"
        placeholder="Название"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.name || ""}
      ></input>
      <span className="place-name-input-error popup__input-error"></span>

      <input
        id="place-link-input"
        className="popup__input popup__input_place_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link || ""}
      ></input>
      <span className="place-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
