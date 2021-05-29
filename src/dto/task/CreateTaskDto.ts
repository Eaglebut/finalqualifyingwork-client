export class CreateTaskDto {
    private name: string;
    private text: string;
    private position: number;


    constructor(name: string, text: string, position: number) {
        this.name = name;
        this.text = text;
        this.position = position;
    }
}