import successImage from "../images/successImage.png";
import failImage from "../images/failImage.png";

const InfoTooltip = ({ data, isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__info">
        <img
          src={(data.image === "success" ? successImage : failImage)}
          alt="значок"
          className="popup__info-image"
        ></img>
        <span className="popup__info-message">{data.message}</span>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-icon opacity"
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
