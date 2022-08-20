import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationContext } from "../../App";
import { TooLongName, TooLongPassword, TooShortName, TooShortPassword } from "../../Results";
import { Name, Password } from "../../StringsLegthConstants";
import { NotificationAlert } from "../NotificationAlert";

export function LoginPage() {
    const authentication = useContext(authenticationContext)
    const [passwordData, setPasswordData] = useState({ password: "", isValid: true, message: "" })
    const [nameData, setNameData] = useState({ name: "", isValid: true, message: "" })
    const navigator = useNavigate();
    useEffect(()=>{document.title = "Главная"},[]);
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        let passwordString = event.currentTarget.value;
        if (passwordString.length < Password.min) setPasswordData({ password: passwordString, isValid: false, message: TooShortPassword });
        else if (passwordString.length > Password.max) setPasswordData({ password: passwordString, isValid: false, message: TooLongPassword });
        else setPasswordData({ password: passwordString, isValid: true, message: "" });
    }
    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
        let nameString = event.currentTarget.value;
        if (nameString.length < Name.min) setNameData({ name: nameString, isValid: false, message: TooShortName });
        else if (nameString.length > Name.max) setNameData({ name: nameString, isValid: false, message: TooLongName })
        else setNameData({ name: nameString, isValid: true, message: "" });
    }
    async function submitClick(event: React.MouseEvent) {
        event.preventDefault();
        if (nameData.isValid && passwordData.isValid) {
            let authHeader = { Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(`${nameData.name}:${passwordData.password}`))) };
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
            else setPasswordData({ password: passwordData.password, isValid: false, message: "Введённые данные не верны." })
        }
    }
    return (
        <div className="col-8 align-self-center">
            <h1 className="mb-3">Вход в приложение</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name">Имя</label>
                    <input onChange={changeName} type="text" id="name" className="form-control mb-3" name="userName" placeholder="Введите имя" />
                    {!nameData.isValid &&
                        <NotificationAlert succesful={nameData.isValid} message={nameData.message}></NotificationAlert>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Пароль</label>
                    <input onChange={changePassword} type="password" className="form-control mb-3" id="exampleInputPassword1" name="password"
                        placeholder="Введите пароль" />
                    {!passwordData.isValid &&
                        <NotificationAlert succesful={passwordData.isValid} message={passwordData.message}></NotificationAlert>
                    }
                </div>
                <button disabled={!(passwordData.isValid && nameData.isValid)} className="btn btn-primary mb-3" onClick={submitClick}>Войти</button>
            </form>
        </div>
    )
}