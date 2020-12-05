import { Firebase } from "../Utils/Firebase";
import { Model } from "./Model";

export class Chat extends Model {

    constructor(){

        super();

    }

    get users(){ this._data.users; }
    set users(value){ this._data.users = value; }

    get timeStamp(){ this._data.timeStamp; }
    set timeStamp(value){ this._data.timeStamp = value; }

    static getRef(){

        return Firebase.db().collection('/chats');

    }

    static create(meEmail, contactEmail){

        return new Promise((resolve, reject) => {

            let users = {};

            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            console.log('users:', users);

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc => {

                console.log('Doc:', doc);

                Chat.getRef().doc(doc.id).get().then(chat => {

                    console.log('Chat:', chat);

                    resolve(chat);

                }).catch(err => {

                    console.log('Err:', err);

                    reject(err);
                });

            }).catch(err => {
                reject(err);
            });

        });

    }

    static find(meEmail, contactEmail){

        return Chat.getRef()
            .where(btoa(meEmail), '==', true)
            .where(btoa(contactEmail), '==', true)
            .get();

    }

    static createIfNotExists(meEmail, contactEmail){

        return new Promise((resolve, reject) => {

            Chat.find(meEmail, contactEmail).then(chats => {

                console.log('Chats:', chats);

                if(chats.empty) {

                    Chat.create(meEmail, contactEmail).then(chat => {
                        console.log('Chat if:', chat);

                        resolve(chat);

                    });

                } else {

                    chats.forEach(chat => {
                        resolve(chat);
                    });

                }

            }).catch(err => {
                reject(err);
            });

        });

    }

}