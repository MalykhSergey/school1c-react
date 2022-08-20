import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authenticationContext } from "../../App";
import { ClassDTO } from "../../dtos/ClassDTO";
import { TaskDTO } from "../../dtos/TaskDTO";
import { TaskCard } from "../TaskCard";

export function TasksPage() {
    let classDTO = useLocation().state as ClassDTO;
    let [tasks, setTasks] = useState(new Array<TaskDTO>)
    let authentication = useContext(authenticationContext);
    useEffect(() => {
        async function loadTasks() {
            let result = await fetch("http://localhost:8080/api/teacher/tasks/?classId=" + classDTO.classId, {
                method: "GET",
                headers: authentication.authHeader,
            });
            if (!result.ok) return;
            else {
                setTasks(await result.json());
            }
        }
        loadTasks();
    }, [])
    let tasksList = tasks.map(task => {
        return (<TaskCard key={task.id} task={task} actual={false} hideStatus={true} />)
    })
    return (
        <>
            <h1>Задачи для класса: {classDTO.className}</h1>
            <div className="container mb-3">
                {tasksList}
            </div>
        </>);
}