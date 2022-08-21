import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationContext } from "../../App";
import { changeField, FieldState, NameField, PasswordField } from "../../Fields";
import { NotificationAlert } from "../NotificationAlert";

export function LoginPage() {
    const authentication = useContext(authenticationContext);
    const [nameData, setNameData] = useState(new FieldState("", false, ""));
    const [passwordData, setPasswordData] = useState(new FieldState("", false, ""));
    const navigator = useNavigate();
    useEffect(() => { document.title = "Войти" }, []);
    async function submitClick(event: React.MouseEvent) {
        event.preventDefault();
        if (nameData.isValid && passwordData.isValid) {
            let authHeader = { Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(`${nameData.value}:${passwordData.value}`))) };
            let result = await fetch("http://127.0.0.1:8080/api/login", {
                method: "GET",
                headers: authHeader
            })
            if (result.status === 200) {
                navigator("/");
                let auth = { authenticated: true, authHeader: authHeader, role: await result.json() };
                authentication.setState(auth)
                localStorage.setItem("authentication", JSON.stringify(auth));
            }
            else setPasswordData({ value: passwordData.value, isValid: false, message: "Введённые данные не верны." })
        }
    }
    return (
        <div className="col-8 align-self-center">
            <h1 className="mb-3">Вход в приложение</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name">Имя</label>
                    <input onChange={event => changeField(event, NameField, setNameData)} type="text" id="name" className="form-control mb-3" name="userName" placeholder="Введите имя" />
                    {nameData.message != "" &&
                        <NotificationAlert succesful={nameData.isValid} message={nameData.message}></NotificationAlert>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Пароль</label>
                    <input onChange={event => changeField(event, PasswordField, setPasswordData)} type="password" className="form-control mb-3" id="exampleInputPassword1" name="password"
                        placeholder="Введите пароль" />
                    {passwordData.message != "" &&
                        <NotificationAlert succesful={passwordData.isValid} message={passwordData.message}></NotificationAlert>
                    }
                </div>
                <button disabled={!(passwordData.isValid && nameData.isValid)} className="btn btn-primary mb-3" onClick={submitClick}>Войти</button>
            </form>
        </div>
    )
}