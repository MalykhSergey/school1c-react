export class TaskDTO {
    id: number;
    teacherName: string;
    name: string;
    body: string;
    dateString: string;

    constructor(id: number, teacherName: string, name: string, body: string, dateString: string) {
        this.id = id;
        this.teacherName = teacherName;
        this.name = name;
        this.body = body;
        this.dateString = dateString;
    }
}