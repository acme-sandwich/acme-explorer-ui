import { Entity } from './entity.model';

export class Audit extends Entity {
    moment: Date;
    title: string;
    description: string;
    attachments: string[];
    auditor: string;
    trip: string;

    constructor(){
        super();
    }
}
