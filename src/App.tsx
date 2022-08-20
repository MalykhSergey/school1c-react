import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { AuthenticationData } from "./AuthenticationData";
import { Navbar } from "./components/NavBar";
import { HomePage } from "./components/pages/homePage/HomePage";
import { LoginPage } from "./components/pages/LoginPage";
export const authenticationContext = React.createContext(
  new AuthenticationData(
    false,
    "",
    { Authorization: "" },
    ({
      authenticated: boolean,
      role: String,
      authHeader: { Authorization: string }
    }) => { })
);
function App() {
  const [authentication, setAuthentication] = useState({ authenticated: false, role: "", authHeader: { Authorization: "" } });
  return (
    <div className="container h-100">
      <authenticationContext.Provider value={
        new AuthenticationData(
          authentication.authenticated,
          authentication.role,
          authentication.authHeader,
          setAuthentication)
      }>
        <Navbar></Navbar>
        <div className="row page justify-content-center">
          <Routes>
            {authentication.authenticated &&
              <Route path='/' element={<HomePage />} />
            }
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LoginPage />} />
          </Routes>
        </div>
      </authenticationContext.Provider>
    </div >
  );
}
export default App;
