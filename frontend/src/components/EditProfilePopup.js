import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, buttonSubmitText, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]); 
    
    function handleChangeName(e) {
      setName(e.target.value);
    }

    function handleChangeDescription(e) {
      setDescription(e.target.value);
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({name, about: description});
    } 

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={isOpen}
            onClose={onClose}
            buttonSubmitText={buttonSubmitText}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
             <input
                type="text"
                name="profileName"
                value={ name || "Имя" }
                onChange={handleChangeName}
                className="popup__input popup__input_type_name"
                minLength="2"
                maxLength="40"
                id="name"
                
                required />
             <span className="popup__input-error name-error"></span>
           </label>
           <label className="popup__field">
             <input
                type="text"
                name="profileJob"
                value={ description || "Описание" }
                onChange={handleChangeDescription}
                className="popup__input popup__input_type_description"
                minLength="2"
                maxLength="200"
                id="description"
                
                required />
              <span className="popup__input-error description-error"></span>
           </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;