import { Link } from "react-router-dom";
import { TaskDTO } from "../TaskDTO";

export function TaskCard(props: { task: TaskDTO, actual: boolean }) {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5>{props.actual ? "Не решено!" : "Просрочено!"}</h5>
                <h6>От: {props.task.teacherName}</h6>
                <h6>Выполнить до:</h6>
                <h6>{props.task.dateString}</h6>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.task.name}</h5>
                <p className="card-text">{props.task.body}</p>
                {props.actual &&
                    <Link to={"/addAnswer/?taskId=" + props.task.id} state={props.task}
                        className="btn btn-primary">Выполнить</Link>}
            </div>
        </div>
    )
}