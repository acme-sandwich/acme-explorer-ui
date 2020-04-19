export class Entity {
    id: String;
    _id: String;
    version: number;
    __v: number;

    constructor(){
        this.id = '0';
        this._id = '0';
        this.version = 0;
        this.__v = 0;
    }
}
