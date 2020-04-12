import { Entity } from './entity.model';

export class Sponsorship extends Entity {
    banner: string;
    landingPage: string;
    payed: boolean;

    constructor() {
        super();
    }
}
