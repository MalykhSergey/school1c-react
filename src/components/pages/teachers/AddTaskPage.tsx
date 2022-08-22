import React, { useContext, useEffect, useState } from "react";
import { authenticationContext } from "../../App";
import { ClassDTO } from "../../dtos/ClassDTO";
import { TaskDTO } from "../../dtos/TaskDTO";
import { changeField, FieldState, TaskBodyField, TaskNameField } from "../../Fields";
import { loadClassesForTeacher } from "../../utils";
import { ClassSelect } from "../ClassSelect";
import { NotificationAlert } from "../NotificationAlert";

export function AddTaskPage() {
    let authentication = useContext(authenticationContext);
    let [taskNameField, setTaskNameField] = useState(new FieldState("", true, ""))
    let [taskBodyField, setTaskBodyField] = useState(new FieldState("", true, ""))
    let [classes, setClasses] = useState(new Array<ClassDTO>)
    let [classIdField, setClassIdField] = useState(new FieldState("", true, ""));
    let [inputDate, setInputDate] = useState("");
    let [resultMessage, setResultMessage] = useState({ succesful: true, message: "" });
    let currentDate = new Date();
    let currentDateString = currentDate.toJSON();
    useEffect(() => {
        document.title = "Добавить задачу";
        loadClassesForTeacher(authentication, setClasses);
    }, []);
    async function sendTask(event: React.MouseEvent) {
        event.preventDefault();
        if (classIdField.value === "") setClassIdField({ value: "", isValid: false, message: "Выберите класс!" });
        else if (taskNameField.isValid && taskBodyField.isValid) {
            let response = await fetch("http://127.0.0.1:8080/api/teacher/addTask/?classId=" + classIdField.value, {
                method: "POST",
                headers: { Authorization: authentication.authHeader, "Content-Type": "application/json" },
                body: JSON.stringify(new TaskDTO(0, "", taskNameField.value, taskBodyField.value, inputDate))
            })
            if (response.ok) {
                let responseBody = await response.json();
                if (responseBody.error == null)
                    setResultMessage({ succesful: true, message: "Задача успешно добавлена!" });
                else {
                    setResultMessage({ succesful: false, message: responseBody.error });
                }
            }
        }
    }
    return (
        <div className="col align-self-center">
            <h1>Добавить задачу</h1>
            <form>
                <ClassSelect classes={classes} classIdField={classIdField} setClassIdField={setClassIdField} />
                <div className="form-group ьи-3">
                    <label htmlFor="taskName">Заголовок</label>
                    <input onChange={event => changeField(event, TaskNameField, setTaskNameField)} required type="text" id="taskName" name="taskName" className="form-control" placeholder="Введите заголовк" />
                </div>
                {!taskNameField.isValid &&
                    <NotificationAlert succesful={false} message={taskNameField.message} />}
                <div className="form-group">
                    <label htmlFor="taskBody">Задание</label>
                    <textarea onChange={event => changeField(event, TaskBodyField, setTaskBodyField)} required id="taskBody" name="taskBody" className="form-control" placeholder="Введите задание" />
                </div>
                {!taskBodyField.isValid &&
                    <NotificationAlert succesful={false} message={taskBodyField.message} />}
                <div className="form-group">
                    <label htmlFor="taskDate">Выполнить до</label>
                    <input onChange={(event) => { setInputDate(event.currentTarget.value) }} type="datetime-local" id="taskDate" name="taskDate" className="form-control" min={currentDateString.substring(0, currentDateString.length - 8)} />
                </div>
                <button className="btn btn-primary mb-3" onClick={sendTask}>Отправить</button>
                {resultMessage.message != "" &&
                    <NotificationAlert succesful={resultMessage.succesful} message={resultMessage.message} />}
            </form>
        </div>
    )
}