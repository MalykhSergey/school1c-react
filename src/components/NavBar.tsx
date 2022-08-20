import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authenticationContext } from "../App";

export function Navbar() {
    const authentication = useContext(authenticationContext)
    function logoutClick() {
        console.log(authentication);
        authentication.setState({ authenticated: false, role: "", authHeader: { Authorization: "" } });
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand">SchoolC</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Главная</NavLink>
                        </li>
                        {authentication.authenticated &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Возможности
                                </a>
                                {authentication.role === "ROLE_ADMIN" &&
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/user/add">Добавить пользователя</a></li>
                                        <li><a className="dropdown-item" href="/school/add">Добавить школу</a></li>
                                        <li><a className="dropdown-item" href="/class/add">Добавить класс</a></li>
                                        <li><a className="dropdown-item" href="/class/linkTeacher">Привязать учителя к классу</a></li>
                                        <li><a className="dropdown-item" href="/class/linkStudent">Переприривязать ученика к классу</a></li>
                                    </ul>
                                }
                            </li>}
                        <li className="nav-item">
                            {!authentication.authenticated ? <NavLink className="nav-link" to="/login">Войти</NavLink>
                                : <NavLink className="nav-link" to="/logout" onClick={logoutClick}>Выйти</NavLink>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}