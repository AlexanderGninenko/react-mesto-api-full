function PopupWithForm(props) {
  
  return (
    <div className={`popup popup__${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className={`popup__save-btn popup__save-btn_${props.name}`}
            
          >
            {props.isLoading ? 'Сохранение...' : props.buttonText}
          </button>
        </form>
        <button onClick={props.onClose} type="button" className="popup__close-icon opacity"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
