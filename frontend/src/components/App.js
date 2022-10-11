import React from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import InfoToolTip from './InfoTooltip';
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from "./ProtectedRoute.js";

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);  
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = React.useState(false);
  const [isSuccessInfoToolTip, setIsSuccessInfoToolTip] = React.useState(null);
  const navigate = useNavigate();

  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    handleCheckToken();
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      api.getInitialCards(token)
        .then((cards) => {
          setCards(cards);
          
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen (true);   
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData, token)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(userData) {
    api.editAvatar(userData, token)
      .then((newUserData) => {
        setCurrentUser({ ...currentUser, avatar: newUserData.avatar });
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  
  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card, token)
      .then(() => {
        setCards((prevState) => prevState.filter((cardIterable) => cardIterable._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSubmit(newCard) {
    api.addCard(newCard, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setIsLoggedIn(true);
          navigate("/");
          setToken(res.token);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setUserEmail(res.data.email);
        setIsSuccessInfoToolTip(true);
        setInfoToolTipPopupOpen(true);
      })
      .catch(() => {
        setIsSuccessInfoToolTip(false);
        setInfoToolTipPopupOpen(true);
      });
  }

  function handleLogin(data) {
    auth.login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleCheckToken();
        setToken(res.token);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsSuccessInfoToolTip(null);
    setToken('');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route exact path="/" element={<ProtectedRoute 
          component={Main} 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          isLoggedIn={isLoggedIn}
          />
          }
          /> 
                            
          <Route 
          exact path="/sign-up" 
          element={<Register
            name="Register"
            buttonSubmitText="Зарегестрироваться"
            onSubmit={handleRegister}
            title="Регистрация"
          />}
          />
                     
          <Route 
          exact path="/sign-in" 
          element={<Login
            name="Login"
            buttonSubmitText="Войти"
            onSubmit={handleLogin}
            title="Вход"
          />}
          />
          
        </Routes>

        <Footer isLoggedIn={isLoggedIn}/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonSubmitText="Сохранить"
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonSubmitText="Сохранить"
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonSubmitText="Создать"
          onAddPlace={handleSubmit}
        />
 
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          isSuccess={isSuccessInfoToolTip}
          onClose={closeAllPopups}
          
        />


        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    
    </div>
  );
}

export default App;
