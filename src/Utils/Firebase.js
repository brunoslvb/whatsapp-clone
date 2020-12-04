const firebase = require('firebase/firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyC4Q0EaHnjhioFOuBsWCUuCa7mw0QpkLhE",
            authDomain: "wpp-clone-25df8.firebaseapp.com",
            projectId: "wpp-clone-25df8",
            storageBucket: "wpp-clone-25df8.appspot.com",
            messagingSenderId: "608613281428",
            appId: "1:608613281428:web:3329b37bea150455874e81",
            measurementId: "G-8GK5KGM67B",
        }

        this.init();

    }

    init(){

        if(!window._initialized){
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true,
            });

            window._initialized = true;
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