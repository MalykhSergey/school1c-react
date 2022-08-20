import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { authenticationContext } from "../../App";
import { TooLongAnswerBody, TooShortAnswerBody } from "../../Results";
import { AnswerBody } from "../../StringsLegthConstants";
import { TaskDTO } from "../../TaskDTO";
import { NotificationAlert } from "../NotificationAlert";

export function AnswerPage() {
    let authentication = useContext(authenticationContext);
    let task: TaskDTO = useLocation().state as TaskDTO;
    let first = useRef(true);
    let [body, setBody] = useState("");
    let [isBodyValid, setIsBodyValid] = useState(true);
    let [notificationMessage, setNotificationMessage] = useState("");
    let isSended = useRef(false);
    async function send(event: React.MouseEvent) {
        event.preventDefault();
        if (isSended.current)
            setNotificationMessage("Вы уже отправили ответ!");
        else if (!isBodyValid) return;
        else {
            let result = await fetch("http://127.0.0.1:8080/api/addAnswer/?" + new URLSearchParams({ taskId: task.id.toString() }), {
                method: "POST",
                headers: authentication.authHeader,
                body: body
            });
            if (!result.ok) {
                setIsBodyValid(false);
                setNotificationMessage("Ошибка!")
            } else {
                let responseBody = await result.json();
                if (responseBody.error == null) {
                    isSended.current = true
                    setNotificationMessage("Ответ успешно добавлен.")
                }
                else {
                    setIsBodyValid(false);
                    setNotificationMessage(responseBody.error);
                }
            }
        }
    }
    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        if (body.length > AnswerBody.max) {
            setIsBodyValid(false);
            setNotificationMessage(TooLongAnswerBody);
        }
        else if (body.length < AnswerBody.min) {
            setIsBodyValid(false);
            setNotificationMessage(TooShortAnswerBody);
        }
        else {
            setIsBodyValid(true);
            setNotificationMessage("");
        }
    }, [body])
    return (
        <div className="container mt-2">
            <div className="card">
                <h6 className="card-header">Выполнить до: {task.dateString}</h6>
                <div className="card-body">
                    <h5>{task.name}</h5>
                    <p className="card-text">{task.body}</p>
                    <form method="post" id="form">
                        <textarea aria-required onChange={event => setBody(event.currentTarget.value)} required className="form-control" name="body" placeholder="Введите решение"></textarea>
                        <button disabled={!isBodyValid} onClick={send} className="btn btn-primary mt-2 mb-3">Отправить</button>
                        {notificationMessage !== "" && <NotificationAlert succesful={isBodyValid} message={notificationMessage}></NotificationAlert>}
                    </form>
                </div>
            </div>
        </div>
    )
}