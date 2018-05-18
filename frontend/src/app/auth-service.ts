import * as fb from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService{
    authenticated: boolean = false;

    register(email:string,password:string){
        fb.auth().createUserAndRetrieveDataWithEmailAndPassword(email,password).catch(
            error => console.log('Error occured')
        );

    }
    login(email:string,password:string){
        fb.auth().signInWithEmailAndPassword(email,password).then(
            response => console.log(response)
        ).catch(
            error=>console.log(error)
        )
        if(fb.auth().onAuthStateChanged(function(user){
            if(user){
                console.log(user);
            }else{
                console.log(user);
            }
        })){

        }
    }

    getAuthStatus(){
        return this.authenticated;
    }
}