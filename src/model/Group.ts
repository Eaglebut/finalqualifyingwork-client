import User from "./User";
import TaskGroup from "./TaskGroup";
import {GroupType} from "./enums/GroupType";
import {UserRole} from "./enums/UserRole";

export default class Group {
    public groupId: number;
    public name: string;
    public description: string;
    public groupType: GroupType;
    public memberList: Map<User, UserRole>;
    public subGroups: Set<Group>;
    public taskGroups: Array<TaskGroup>;

    constructor(id: number, name: string, description: string, groupType: GroupType, memberList: Map<User, UserRole>, subGroups: Set<Group>, taskGroup: Array<TaskGroup>) {
        this.groupId = id;
        this.name = name;
        this.description = description;
        this.groupType = groupType;
        this.memberList = memberList;
        this.subGroups = subGroups;
        this.taskGroups = taskGroup;
    }

    public static fromJSON(json: any): Group {
        return new Group(json.id,
            json.name,
            json.description,
            json.groupType,
            User.fromJsonToMap(json.memberList),
            Group.fromJSONSet(json.subGroups),
            TaskGroup.fromJson(json.taskGroups));
    }

    public static fromJSONArray(json: any): Array<Group> {
        let groupArr: Array<Group> = new Array<Group>();
        json.forEach((element: any) => {
            groupArr.push(Group.fromJSON(element));
        })
        return groupArr;
    }

    public static fromJSONSet(json: any): Set<Group> {
        let groupArr: Set<Group> = new Set<Group>();
        json.forEach((element: any) => {
            console.log("test");
            groupArr.add(Group.fromJSON(element));
        })
        return groupArr;
    }

    public toString(): string {
        return ("Group: " +
            "{id: " + this.groupId +
            ", name: " + this.name +
            ", description: " + this.description +
            ", groupType: " + this.groupType +
            ", memberList: " + Array.from(this.memberList).map(value => value.toString() + " ").toString() + "}");
    }
}


