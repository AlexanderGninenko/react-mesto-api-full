function ImagePopup(props) {

  return (
  
    <div className={`popup popup_dark_theme ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-wrapper">
        <button onClick={props.onClose} type="button" className="popup__close-icon opacity"></button>
        <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''} className="popup__image"></img>
        <span className="popup__image-description">{props.card ? props.card.name : ''}</span>
      </div>
    </div>
  
  );
}

export default ImagePopup;
