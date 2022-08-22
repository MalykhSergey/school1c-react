import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { authenticationContext } from "../../App";
import { TaskDTO } from "../../dtos/TaskDTO";
import { AnswerBodyField, changeField, FieldState } from "../../Fields";
import { NotificationAlert } from "../NotificationAlert";

export function AnswerPage() {
    let authentication = useContext(authenticationContext);
    let task: TaskDTO = useLocation().state as TaskDTO;
    let first = useRef(true);
    let [bodyField, setBodyField] = useState(new FieldState("", true, ""));
    let isSended = useRef(false);
    useEffect(() => { document.title = "Добавить ответ" }, []);
    async function send(event: React.MouseEvent) {
        event.preventDefault();
        if (isSended.current) {
            setBodyField({ value: bodyField.value, isValid: true, message: "Вы уже отправили ответ!" });
        }
        else if (!bodyField.isValid) return;
        else {
            let result = await fetch("http://127.0.0.1:8080/api/student/addAnswer/?" + new URLSearchParams({ taskId: task.id.toString() }), {
                method: "POST",
                headers: { Authorization: authentication.authHeader },
                body: bodyField.value
            });
            if (!result.ok) {
                setBodyField({ value: bodyField.value, isValid: false, message: "Ошибка!" })
            } else {
                let responseBody = await result.json();
                if (responseBody.error == null) {
                    isSended.current = true
                    setBodyField({ value: bodyField.value, isValid: true, message: "Отправлено!" })
                }
                else {
                    setBodyField({ value: bodyField.value, isValid: false, message: responseBody.error })
                }
            }
        }
    }
    return (
        <div className="container mt-2">
            <div className="card">
                <h6 className="card-header">Выполнить до: {task.dateString}</h6>
                <div className="card-body">
                    <h5>{task.name}</h5>
                    <p className="card-text">{task.body}</p>
                    <form method="post" id="form">
                        <textarea aria-required onChange={event => changeField(event, AnswerBodyField, setBodyField)} required className="form-control" name="body" placeholder="Введите решение"></textarea>
                        <button disabled={!bodyField.isValid} onClick={send} className="btn btn-primary mt-2 mb-3">Отправить</button>
                        {bodyField.message !== "" && <NotificationAlert succesful={bodyField.isValid} message={bodyField.message}></NotificationAlert>}
                    </form>
                </div>
            </div>
        </div>
    )
}