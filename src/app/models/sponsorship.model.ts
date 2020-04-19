import { Entity } from './entity.model';

export class Sponsorship extends Entity {
    banner: string;
    landingPage: string;
    payed: boolean;
    trips: [string];
    creator: string;

    constructor() {
        super();
    }
}
