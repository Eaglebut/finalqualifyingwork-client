import User from "./User";

export default class Task {

    public taskId: number;
    public name: string;
    public text: string;
    public author: User;
    public position?: number;


    constructor(taskId: number, name: string, text: string, author: User, position ?: number) {
        this.taskId = taskId;
        this.name = name;
        this.text = text;
        this.author = author;
        this.position = position;
    }

    public static fromJsonArray(json: any): Array<Task> {
        const taskList = new Array<Task>();

        json.forEach((jsonTask: any) => {
            taskList.push(Task.fromJson(jsonTask));
        })

        return taskList;
    }

    public static fromJson(json: any): Task {
        return new Task(json.id, json.name, json.text, User.fromJson(json.author), json.position)
    }

}