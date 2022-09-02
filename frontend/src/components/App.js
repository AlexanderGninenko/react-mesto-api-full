import React from "react";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipData, setInfoTooltipData] = React.useState({});

  const [isRenderLoading, setIsRenderLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();

    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards.reverse());
        })
        .catch((err) => console.log(err));

      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsRenderLoading(true);
    api
      .delete(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item !== card));
        closeAllPopups();
        setIsRenderLoading(false);
      })
      .catch((err) => console.log(err));
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleConfirmDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const handleUpdateUser = (data) => {
    setIsRenderLoading(true);
    api
      .sendUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
        setIsRenderLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    setIsRenderLoading(true);
    api
      .handleUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setIsRenderLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    setIsRenderLoading(true);
    api
      .addUserCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsRenderLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleRegistration = (password, email) => {
    setIsRenderLoading(true);
    auth
      .register(password, email)
      .then(() => {
        setInfoTooltipData({
          image: "success",
          message: "Вы успешно зарегистрировались!",
        });
        history.push("/sign-in");
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipData({
          image: "fail",
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsRenderLoading(false);
      });
  };

  const handleAuthorization = (password, email) => {
    setIsRenderLoading(true);
    auth
      .authorization(password, email)
      .then((data) => auth.getContent(data))
      .then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setInfoTooltipData({
          image: "fail",
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsRenderLoading(false);
        
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);

    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  return (
    <Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onConfirmCardDelete={handleConfirmDeleteClick}
          />
          <Route path="/sign-up/">
            <Register
              onRegister={handleRegistration}
              isLoading={isRenderLoading}
            />
          </Route>
          <Route path="/sign-in/">
            <Login
              onLogin={handleAuthorization}
              isLoading={isRenderLoading}
              loggedIn={loggedIn}
            />
          </Route>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isLoading={isRenderLoading}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isLoading={isRenderLoading}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            isLoading={isRenderLoading}
            onClose={closeAllPopups}
            card={selectedCard}
            onCardDelete={handleCardDelete}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            isLoading={isRenderLoading}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            data={infoTooltipData}
            onClose={closeAllPopups}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </Switch>
  );
}

export default withRouter(App);
