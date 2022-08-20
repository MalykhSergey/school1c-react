import React, { useContext, useEffect, useState } from "react";
import { AnswerDTO } from "../../../AnswerDTO";
import { authenticationContext } from "../../../App";
import { TaskDTO } from "../../../TaskDTO";
import { TaskCard } from "../../TaskCard";
import { AnswerCard } from "./AnswerCard";

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
            <TaskCard key={task.id} task={task} actual={true} />
        )
    });
    const oldTaskList = tasksAndAnswers.oldTaskDTOS.map(task => {
        return (
            <TaskCard key={task.id} task={task} actual={false} />
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
        loadTeacherNames();
        loadTasks();
    }, []);

    async function loadTasks() {
        let response = await fetch("http://localhost:8080/api/studentsTasksAndAnswers", {
            method: "GET",
            headers: authentication.authHeader
        });
        let tasks = await response.json();
        setTasksAndAnswers(tasks);
    }

    async function loadTasksByTeacherName(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.currentTarget.value !== "all") {
            let response = await fetch("http://localhost:8080/api/studentsTasksAndAnswers?" + new URLSearchParams({ teacherName: event.currentTarget.value }), {
                method: "GET",
                headers: authentication.authHeader
            });
            let tasks = await response.json();
            setTasksAndAnswers(tasks);
        } else loadTasks();
    }

    async function loadTeacherNames() {
        let response = await fetch("http://localhost:8080/api/teacherNames", {
            method: "GET",
            headers: authentication.authHeader
        });
        let teacherNames = await response.json();
        setTeacherNames(teacherNames);
    }
    
    return (
        <>
            <div className="col-3">
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