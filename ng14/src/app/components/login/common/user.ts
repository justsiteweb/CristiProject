import { Role } from "./role";

export class User {

    constructor(
        public id: number,
        public username: string,
        public name:string,
        public surname: string,
        public password: string,
        public roles:Array<Role>
        ) {}

}