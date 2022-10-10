import React from 'react';

function InfoToolTip({isOpen, isSuccess, onClose}) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
        <div className="popup__body popup__content">
            <button className="popup__button-close" type="button" onClick={onClose}></button>
            <div className={`popup__tooltip-image ${!isSuccess ? "popup__tooltip-image_type_fail" : ""}`}></div>
            <h2 className="popup__tooltip-title">{!isSuccess ? "Что-то пошло не так! Попробуйте еще раз." : "Вы успешно зарегистрировались!" }</h2>
        </div>
    </div>
  )
}

export default InfoToolTip;