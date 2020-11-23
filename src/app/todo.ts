export class Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    level: string;
    status: boolean;

    constructor(id: number, title: string, description: string, due: string, level: string, status: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.due = due;
        this.level = level;
        this.status = status;
    }
}
