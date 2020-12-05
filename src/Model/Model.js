import { ClassEvent } from "../Utils/ClassEvent";

export class Model extends ClassEvent{

    constructor(){

        super();

        this._data = {};
    
    }

    fromJson(json){

        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());

    }

    toJSON(){

        return this._data;

    }

}