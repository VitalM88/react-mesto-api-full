import React from 'react';


function AuthForm({name, buttonSubmitText, onSubmit, title}) {

    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
        
    function handleChangeEmail(e) {
        setUserEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setUserPassword(e.target.value);
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      onSubmit({email: userEmail, password: userPassword});
    } 

    return (
        <div className="auth">
            <h2 className="auth__title">{title}</h2>
            <form 
            className="auth__form"
            name={`${name}-form`} 
            onSubmit={handleSubmit}
            noValidate>
                <label className="auth__field">
                   <input
                    type="email"
                    name="email"
                    value={ userEmail || "" }
                    placeholder="Email"
                    onChange={handleChangeEmail}
                    className="auth__input auth__input_type_email"
                    minLength="2"
                    maxLength="40"
                    required />
                    <span className="popup__input-error email-error"></span>
                </label>
                <label className="auth__field">
                   <input
                    type="password"
                    name="password"
                    value={ userPassword || "" }
                    placeholder="Пароль"
                    onChange={handleChangePassword}
                    className="auth__input auth__input_type_password"
                    minLength="8"
                    maxLength="40"
                    required />
                    <span className="popup__input-error password-error"></span>
                </label>
                <button
                   type="submit"
                   className="auth__submit"
                   >
                   {buttonSubmitText}
                </button>
            </form>
        </div>
    );
}

export default AuthForm;