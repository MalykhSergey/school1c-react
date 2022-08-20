import { TaskDTO } from "./TaskDTO";

export class AnswerDTO {
    id: number;
    body: string;
    rating: number;
    comment: string;
    taskDTO: TaskDTO;
    
    constructor($id: number, $body: string, $rating: number, $comment: string, $taskDTO: TaskDTO) {
        this.id = $id;
        this.body = $body;
        this.rating = $rating;
        this.comment = $comment;
        this.taskDTO = $taskDTO;
    }
}