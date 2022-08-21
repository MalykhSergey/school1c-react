import { useContext, useEffect, useState } from "react";
import { authenticationContext } from "../../App";
import { changeField, FieldState, TaskBodyField, TaskNameField } from "../../Fields";
import { NotificationAlert } from "../NotificationAlert";

export function AddTaskPage() {
    let authentication = useContext(authenticationContext);
    let [taskNameField, setTaskNameField] = useState(new FieldState("", true, ""))
    let [taskBodyField, setTaskBodyField] = useState(new FieldState("", true, ""))
    let currentDate = new Date();
    let currentDateString = currentDate.toJSON();
    useEffect(() => { document.title = "Добавить задачу" }, []);
    return (
        <>
            <form>
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
                    <input type="datetime-local" id="taskDate" name="taskDate" className="form-control" min={currentDateString.substring(0, currentDateString.length - 8)} />
                </div>
                <button className="btn btn-primary mb-3">Отправить</button>
            </form>
        </>
    )
}