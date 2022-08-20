import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { AuthenticationData } from "./AuthenticationData";
import { Navbar } from "./components/NavBar";
import { AnswerPage } from "./components/pages/AnswerPage";
import { HomePage } from "./components/pages/homePage/HomePage";
import { LoginPage } from "./components/pages/LoginPage";
import { TasksPage } from "./components/pages/TasksPage";
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
  useEffect(() => {
    let auth = localStorage.getItem("authentication");
    if (auth != null) {
      setAuthentication(JSON.parse(auth));
      console.log('logged by local storage')
    }
  }, [])
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
            <Route path="/addAnswer/" element={<AnswerPage />} />
            {authentication.role === "Teacher" &&
              <Route path="/tasks/" element={<TasksPage />} />}
            <Route path="/logout" element={<LoginPage />} />
            <Route path="/*" element={<h1>Not found</h1>} />
          </Routes>
        </div>
      </authenticationContext.Provider>
    </div >
  );
}
export default App;
