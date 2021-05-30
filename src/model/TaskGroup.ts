import Task from "./Task";


export default class TaskGroup {

    public taskGroupId: number;
    public name: string;
    public taskList: Array<Task>;
    public position: number;


    constructor(taskGroupId: number, name: string, taskList: Array<Task>, position: number) {
        this.taskGroupId = taskGroupId;
        this.name = name;
        this.taskList = taskList;
        this.position = position;
    }

    public static fromJsonArray(json: any): Array<TaskGroup> {
        const taskGroupList = new Array<TaskGroup>();
        json.forEach((jsonTaskGroup: any) => {
            taskGroupList.push(TaskGroup.fromJson(jsonTaskGroup));
        });
        return taskGroupList;
    }

    public static fromJson(json: any): TaskGroup {
        return new TaskGroup(json.id, json.name, Task.fromJsonArray(json.taskList), json.position);
    }

    public toString(): string {
        return ""
    }
}