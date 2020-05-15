import { Entity } from './entity.model';
import { Deserializable } from './deserializable.model';

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

export class PictureObject implements Deserializable {
    Buffer: string;
    contentType: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    toJSON() {
        return {
            Buffer: this.Buffer,
            contentType: this.contentType
        };
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
    photo: string;
    photoObject: PictureObject[];
    latitude: number;
    longitude: number;

    constructor(){
        super();
    }
}
