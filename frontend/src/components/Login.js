import React from 'react';
import AuthForm from './AuthForm';

function Login({name, buttonSubmitText, onSubmit, title}) {

    return (
        <AuthForm 
          name={name}
          buttonSubmitText={buttonSubmitText}
          onSubmit={onSubmit}
          title={title}
        />
    );
}

export default Login;