import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onCardDelete(props.card);
  };

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      buttonText= {props.isLoading ? 'Подождите...' : 'Да'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;