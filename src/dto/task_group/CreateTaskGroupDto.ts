export default class CreateTaskGroupDto {
    private name: string;
    private position: number;


    constructor(name: string, position: number) {
        this.name = name;
        this.position = position;
    }
}