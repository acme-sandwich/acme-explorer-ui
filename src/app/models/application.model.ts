import {Entity} from './entity.model';

export class Application  extends Entity {
    moment: Date;
    status: string;
    comments: string[];
    trip: string;
    explorer: string;

    constructor() {
        super();
    }
}
