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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiConst } from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function onDeleteCardClick(movie) {
    const savedMovie = savedMovies.find((m) => m.nameRU === movie.nameRU);
    ApiConst.deleteMovie(savedMovie._id).then(() => {
      const updatedList = savedMovies.filter((m) => {
        if (m.nameRU === movie.nameRU) {
          return false;
        } else {
          return true;
        }
      });
      setSavedMovies(updatedList);
    })
    .catch((err) => console.log(err));
  }

  function onLikeCardClick(movie) {
    ApiConst.addMovie(movie)
      .then((saved) => {
        setSavedMovies([saved, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function register(name, email, password) {
    ApiConst.registrate(name, email, password)
      .then((res) => {
        authorizate(email, password);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkToken();
    localStorage.setItem("path", location.pathname);
    navigate(location.pathname);
  }, [location.pathname]);

  function checkToken() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setIsLogin(true);
    }
  }

  function authorizate(email, password) {
    ApiConst.authorizate(email, password)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("token", jwt.token);
          setIsLogin(true);
          setIsLogin(false);
          setIsLogin(true);
          navigate("/movies", { replace: true });
        }
      })
      .then((res) => {
        ApiConst.getInfoAboutMe().then((data) => {
          setCurrentUser({ email: data.user.email, name: data.user.name });
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
        });
      })
      .catch((err) => console.log(err));
  }

  function updateUser(email, name) {
    ApiConst.updateProfileData(email, name)
      .then((data) => {
        setCurrentUser({ email: data.user.email, name: data.user.name });
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");

    if (currentUser.email !== email && currentUser.name !== name) {
      setCurrentUser({ email: email, name: name });
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("savedMoviesStorage", JSON.stringify(savedMovies));
  }, [currentUser, savedMovies]);

  useEffect(() => {
    let saved = localStorage.getItem('savedMoviesStorage');

    if (isLogin) {
      ApiConst.getMovies()
        .then((data) => {
          setSavedMovies(data.movies);
        })
        .catch((err) => console.log(err));
    } else {
      saved = JSON.parse(saved);
      setSavedMovies(saved);
    }
  }, [currentUser, isLogin]);

  function handleLogOut() {
    setCurrentUser({});
    setSavedMovies([]);
    setIsLogin(false);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }

  function handleBack() {
    navigate(-2);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/*" element={<NotFound handleBack={handleBack} />} />
          <Route
            path="/"
            element={
              <>
                {isLogin ? <Navigation /> : <Header />}
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              isLogin ? <Navigate to="/" /> : <Register register={register} />
            }
          />
          <Route
            path="/signin"
            element={
              isLogin ? (
                <Navigate to="/" />
              ) : (
                <Login authorizate={authorizate} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                page={
                  <>
                    <Navigation />
                    <Profile
                      handleSubmit={updateUser}
                      handleLogOut={handleLogOut}
                    />
                  </>
                }
              ></ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                page={
                  <>
                    <Navigation />
                    <Movies
                      savedMovies={savedMovies}
                      onLikeCardClick={onLikeCardClick}
                      onDeleteCardClick={onDeleteCardClick}
                    />
                    <Footer />
                  </>
                }
              ></ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                page={
                  <>
                    <Navigation />
                    <SavedMovies
                      savedMovies={savedMovies}
                      onLikeCardClick={onLikeCardClick}
                      onDeleteCardClick={onDeleteCardClick}
                    />
                    <Footer />
                  </>
                }
              ></ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
