import { AnswerDTO } from "../../../dtos/AnswerDTO";
import { TaskDTO } from "../../../dtos/TaskDTO";

export function AnswerCard(props: { task: TaskDTO, answer: AnswerDTO }) {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5>Решено!</h5>
                <h6>От: {props.task.teacherName}</h6>
                <h6>Выполнить до:</h6>
                <h6>{props.task.dateString}</h6>
                <h6>Оценка: {props.answer.rating}</h6>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.task.name}</h5>
                <p className="card-text">{props.task.body}</p>
                <h5 className="card-title">Решение</h5>
                <p className="card-text">{props.answer.body}</p>
                <h5 className="card-title">Комментарий</h5>
                <p className="card-text">{props.answer.comment}</p>
            </div>
        </div>
    )
}