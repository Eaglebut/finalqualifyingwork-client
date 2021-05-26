export default class User {
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

    public equals = (user: User | null | undefined) => {
        if (user === null) {
            return false;
        }
        if (user === undefined) {
            return false;
        }
        return this.userId === user.userId && this.email === user.email && this.name === user.name && this.surname === user.surname;
    }
}