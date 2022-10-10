import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onClose, buttonSubmitText, onAddPlace }) {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({name, link});
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm 
            title="Новое место"
            name="card"
            isOpen={isOpen}
            onClose={onClose}
            buttonSubmitText={buttonSubmitText}
            onSubmit={handleSubmit}
        >

            <label className="popup__field">
              <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={handleChangeName}
                className="popup__input popup__input_type_name"
                minLength="2"
                maxLength="30"
                id="title"
                name="name"
                required />
                <span className="popup__input-error title-error"></span>
            </label>
            <label className="popup__field">
              <input
                type="url"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={handleChangeLink}
                className="popup__input popup__input_type_description"
                id="link"
                name="link"
                required />
                <span className="popup__input-error link-error"></span>
            </label>

        </PopupWithForm>
    );
}

export default AddPlacePopup;