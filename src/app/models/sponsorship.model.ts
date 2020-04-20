import { Entity } from './entity.model';

class Picture  {
    data: string;
    contentType: string;

    constructor(){
    }
}

export class Sponsorship extends Entity {
    banner: Picture;
    landingPage: string;
    payed: boolean;
    trips: [string];
    sponsor: string;

    constructor() {
        super();
    }
}
