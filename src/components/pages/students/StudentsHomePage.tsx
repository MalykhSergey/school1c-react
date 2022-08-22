import React, { useContext, useEffect, useState } from "react";
import { authenticationContext } from "../../../App";
import { AnswerDTO } from "../../../dtos/AnswerDTO";
import { TaskDTO } from "../../../dtos/TaskDTO";
import { AnswerCard } from "../../AnswerCard";
import { TaskCard } from "../../TaskCard";

export function StudentsHomePage() {
    const authentication = useContext(authenticationContext)
    let [tasksAndAnswers, setTasksAndAnswers] = useState({
        actualTaskDTOS: new Array<TaskDTO>(),
        oldTaskDTOS: new Array<TaskDTO>(),
        answerDTOS: new Array<AnswerDTO>()
    });
    let [teacherNames, setTeacherNames] = useState(new Array<string>());
    const actualTaskList = tasksAndAnswers.actualTaskDTOS.map(task => {
        return (
            <TaskCard key={task.id} task={task} actual={true} hideStatus={false} />
        )
    });
    const oldTaskList = tasksAndAnswers.oldTaskDTOS.map(task => {
        return (
            <TaskCard key={task.id} task={task} actual={false} hideStatus={false} />
        )
    });
    const answers = tasksAndAnswers.answerDTOS.map(answer => {
        return (
            <AnswerCard key={answer.taskDTO.id} answer={answer} task={answer.taskDTO} />
        )
    });
    const teachers = teacherNames.map(name => {
        return <option key={name} value={name}>{name}</option>
    })
    useEffect(() => {
        async function loadTeacherNames() {
            let response = await fetch("http://localhost:8080/api/student/teacherNames", {
                method: "GET",
                headers: { Authorization: authentication.authHeader }
            });
            let teacherNames = await response.json();
            setTeacherNames(teacherNames);
        }
        loadTeacherNames();
        loadTasks();
    }, []);

    async function loadTasks() {
        let response = await fetch("http://localhost:8080/api/student/tasksAndAnswers", {
            method: "GET",
            headers: { Authorization: authentication.authHeader }
        });
        let tasks = await response.json();
        setTasksAndAnswers(tasks);
    }

    async function loadTasksByTeacherName(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.currentTarget.value !== "all") {
            let response = await fetch("http://localhost:8080/api/student/tasksAndAnswers?" + new URLSearchParams({ teacherName: event.currentTarget.value }), {
                method: "GET",
                headers: { Authorization: authentication.authHeader }
            });
            let tasks = await response.json();
            setTasksAndAnswers(tasks);
        } else loadTasks();
    }
    return (
        <>
            <div className="col-3 offset-md-9">
                <label htmlFor="teacherName">Вывести задания и ответы от:</label>
                <select name="teacherName" id="teacherName" title="Выберите имя учителя" className="form-select" onChange={loadTasksByTeacherName}>
                    <option value="all">Всех</option>
                    {teachers}
                </select>
            </div>
            <h1 className="mb-3">Не выполненные:</h1>
            <div className="container mb-3">
                {actualTaskList}
            </div>
            <h1 className="mb-3">Выполненные и просроченные:</h1>
            <div className="container mb-3">
                {answers}
            </div>
            <div className="container mb-3">
                {oldTaskList}
            </div>
        </>
    )
}