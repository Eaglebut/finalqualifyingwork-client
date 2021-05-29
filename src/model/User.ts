import {UserRole} from "./enums/UserRole";

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

    public static fromJsonToMap(json: any): Map<User, UserRole> {
        let userMap: Map<User, UserRole> = new Map<User, UserRole>();
        Object.keys(json).forEach((key) => {
            userMap.set(User.fromStringJson(key), json[key]);
        })
        return userMap;
    }

    public static fromStringJson(json: string): User {
        let slicedJson: string = json.slice(14, -1);
        let splitJson: string[] = slicedJson.split(",");

        return new User(Number.parseInt(splitJson[0].split("=")[1]),
            splitJson[1].split("=")[1],
            splitJson[2].split("=")[1],
            splitJson[3].split("=")[1]);
    };

    public static fromJson(json: any): User {
        return new User(json.id, json.email, json.name, json.surname);
    }


    public toString(): string {
        return "User {" +
            "userId: " + this.userId +
            ", email: " + this.email +
            ", name: " + this.name +
            ", surname: " + this.surname +
            "}"

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