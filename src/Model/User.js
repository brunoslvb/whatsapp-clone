import { Firebase } from '../Utils/Firebase';
import { Model } from './Model';

export class User extends Model{

    constructor(id){

        super();

        if(id) this.getById(id);

    }

    getById(id){

        return new Promise((resolve, reject) => {

            User.findByEmail(id).onSnapshot(doc => {

                this.fromJson(doc.data());

                resolve(doc);

            });

        });

    }

    get name(){ return this._data.name; }
    set name(value){ this._data.name = value; }

    get email(){ return this._data.email; }
    set email(value){ this._data.email = value; }

    get photo(){ return this._data.photo; }
    set photo(value){ this._data.photo = value; }


    save(){

        return User.findByEmail(this.email).set(this.toJSON());

    }

    static getRef(){

        return  Firebase.db().collection('/users');

    }

    static findByEmail(email){

        return User.getRef().doc(email);

    }

}