import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationContext } from "../../App";

export function LoginPage() {
    const authentication = useContext(authenticationContext)
    const [passwordData, setPasswordData] = useState({ password: "", isValid: true, message: "" })
    const [nameData, setNameData] = useState({ name: "", isValid: true, message: "" })
    const navigator = useNavigate();
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        let passwordString = event.currentTarget.value;
        if (passwordString.length < 2)
            setPasswordData({ password: passwordString, isValid: false, message: "Введите пароль длиннее 2 символов" })
        else
            setPasswordData({ password: passwordString, isValid: true, message: "" })
    }
    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
        let nameString = event.currentTarget.value;
        if (nameString.length < 5)
            setNameData({ name: nameString, isValid: false, message: "Введите имя длиннее 5 символов" })
        else
            setNameData({ name: nameString, isValid: true, message: "" })
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
                authentication.setState({ authenticated: true, authHeader: authHeader, role: await result.json() })
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
                        <div className="alert alert-danger" role="alert">
                            {nameData.message}
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Пароль</label>
                    <input onChange={changePassword} type="password" className="form-control mb-3" id="exampleInputPassword1" name="password"
                        placeholder="Введите пароль" />
                    {!passwordData.isValid &&
                        <div className="alert alert-danger" role="alert">
                            {passwordData.message}
                        </div>
                    }
                </div>
                <button type="submit" className="btn btn-primary mb-3" onClick={submitClick}>Войти</button>
            </form>
        </div>
    )
}