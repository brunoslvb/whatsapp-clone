const firebase = require('firebase/firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: "",
        }

        this.init();

    }

    init(){

        if(!this._initialized){
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true,
            });

            this._initialized = true;
        }
    }

    static db(){

        return firebase.firestore();
        
    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(response => {
                
                let token = response.credential.accessToken;
                let user = response.user;

                resolve({
                    user,
                    token
                })

            }).catch(err => {
                reject(err);
            });

        });

    }

}