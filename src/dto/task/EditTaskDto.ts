export default class EditTaskDto {

    private name: string;
    private text: string;
    private position: number;
    private baseTaskGroupId: number;


    constructor(name: string, text: string, position: number, baseTaskGroupId: number) {
        this.name = name;
        this.text = text;
        this.position = position;
        this.baseTaskGroupId = baseTaskGroupId;
    }
}