import { Entity } from './entity.model';

export class Trip extends Entity {
    ticker: string;
    title: string;
    description: string;
    price: number;
    picture: string;
    startDate: Date;
    endDate: Date;
    requirements: string[];
    cancelled: boolean;
    cancelledReason: string;
    creator: string;

    constructor(){
        super();
    }
}
