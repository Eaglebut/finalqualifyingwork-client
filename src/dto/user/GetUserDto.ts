export default class GetUserDto {
    public userId: number;
    public email: string;
    public name: string;
    public surname: string;


    constructor(userId: number, email: string, name: string, surname: string) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.surname = surname;
    }
}