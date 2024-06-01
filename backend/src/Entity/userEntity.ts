export class UserEntity{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public hours: number,
        public created_at: Date,
        public updated_at: Date
    ){}
}

export interface UserEntityDTO{
    name: string;
    email: string;
    password: string;
    role: string;
    hours: number;
}
    