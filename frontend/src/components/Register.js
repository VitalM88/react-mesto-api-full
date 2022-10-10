import React from 'react';
import { Link } from "react-router-dom";
import AuthForm from './AuthForm';


function Register({name, buttonSubmitText, onSubmit, title}) {

    
    return (
        <div>
            <AuthForm
              name={name}
              buttonSubmitText={buttonSubmitText}
              onSubmit={onSubmit}
              title={title}
            />
            <div className="auth__container">
              <p className="auth__text">Уже зарегистрированы?&nbsp;</p>
              <Link className="auth__link" to={"/sign-in"}>Войти</Link>
            </div>
        </div>
    );
}

export default Register;