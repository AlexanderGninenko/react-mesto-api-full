import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }


  function handleDeleteClick() {
    props.onConfirmCardDelete(props.card)
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__delete-btn ${
    isOwn ? "" : "card__delete-btn_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? 'card__like-btn_active' :''
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  return (
    <li className="card">
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      ></img>
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
