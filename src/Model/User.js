import { Firebase } from '../Utils/Firebase';
import { ClassEvent } from '../Utils/ClassEvent';

export class User extends ClassEvent{

    static getRef(){

        return  Firebase.db().collection('/users');

    }

    static findByEmail(email){

        return User.getRef().doc(email);

    }

}