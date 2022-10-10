import React from 'react';

function Footer ({isLoggedIn}) {
    return (
        <footer className="footer">
            {isLoggedIn && <p className="footer__copyright">&#169; 2022 Mesto Russia</p>}
        </footer>
    );
}

export default Footer;