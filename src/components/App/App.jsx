import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
                {/* 
                 */}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navigation />
                <Profile />
              </>  
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Navigation />
                <Movies />
                <Preloader />
                <Footer />
              </>  
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Navigation />
                <SavedMovies />
                <Preloader />
                <Footer />
              </>  
            }
          />
          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>  
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
