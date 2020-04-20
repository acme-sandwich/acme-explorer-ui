import { Entity } from './entity.model';

class Stage  {
    title: string;
    description: string;
    price: number;

    constructor(){
    }
}

class Picture  {
    data: string;
    contentType: string;

    constructor(){
    }
}

export class Trip extends Entity {
    ticker: string;
    title: string;
    description: string;
    price: number;
    picture: Picture[];
    published: boolean;
    startDate: Date;
    endDate: Date;
    requirements: string[];
    cancelled: boolean;
    cancelledReason: string;
    creator: string;
    created: Date;
    deleted: boolean;
    stages: Stage[];

    constructor(){
        super();
    }
}
