

export class JobsEntity{
    constructor(
        public id: number,
        public title: string,
        public status: number,
        public description: string,
        public created_at: Date,
        public updated_at: Date,
        public progress: number,
        public workers_id: number[],
        public value: number
    ){    }
}

export interface JobsEntityDTO{
    title: string;
    status: number;
    description: string;
    progress: number;
    workers_id: number[];
    value: number;
}