import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, buttonSubmitText, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value="";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
    } 

    return (
        <PopupWithForm 
            title="Обновить аватар"
            name="avatar"
            isOpen={isOpen}
            onClose={onClose}
            buttonSubmitText={buttonSubmitText}
            onSubmit={handleSubmit}
        >

            <label className="popup__field">
                <input
                    ref={avatarRef}
                    type="url"
                    placeholder="Ссылка на аватар"
                    className="popup__input popup__input_type_avatar"
                    id="avatar"
                    name="avatar"
                    required />
                    <span className="popup__input-error avatar-error"></span>
            </label>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;