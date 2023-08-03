import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
