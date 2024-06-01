export class StorageEntity{
    constructor(
        public id: number,
        public name: string,
        public status: number,
        public description: string,
        public quantity: number,
        public price: number,
        public created_at: Date,
        public updated_at: Date
    ){}
}

export interface StorageEntityDTO{
    name: string;
    status?: number;
    description: string;
    quantity: number;
    price: number;
}
    