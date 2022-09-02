import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onConfirmCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="wrapper">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img
              src={currentUser.avatar}
              alt="Фото профиля"
              className="profile__avatar"
            ></img>
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__avatar-edit-button"
            ></button>
          </div>
          <div className="profile__wrapper">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-btn opacity"
                aria-label="Редактировать профиль"
              ></button>
            </div>

            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn opacity"
          type="button"
          aria-label="Добавить место"
        ></button>
      </section>
      <section className="photo-grid">
        <ul className="photo-grid__wrapper">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onConfirmCardDelete={onConfirmCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
