// The authentication service is used to log in, log out, and singup and check of the user has already 
// been authenticated for the application. 

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, map } from "rxjs/operators";

interface User {
  uid : string;
  email: string;
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authErrorMessages$ = new BehaviorSubject<string>(null);
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public user$ = new BehaviorSubject<User>(null);

  private authState : User = null;
  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn().subscribe((user: User) => (this.authState = user));
   }

   private isLoggedIn(): Observable <User | null> {
     return this.afAuth.authState.pipe(
       map(user=> {
         if(user) {
           const {email, uid} =user;
           this.user$.next({email, uid});
           return {email, uid};
         }
         return null;
       }),
       tap(()=> this.isLoading$.next(false))
     );
   }


   
   public get autenticated() : boolean {
     return this.authState !== null;
   }

   
   public get id() : string {
     return this.autenticated ? this.authState.uid : "";
   }


   public signUpFirebase({email, password}) {
     this.isLoading$.next(true);
     this.handleErrorOrSuccess(() => {
       return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
     });
   }

   public loginFirebase({email, password}) {
     this.isLoading$.next(true);
     this.handleErrorOrSuccess(() => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
     });
   }


   public logOutFirebase() {
     this.isLoading$.next(true);
     return this.afAuth.auth.signOut();
   }

   public getCurrentUserUid() : string {
     return this.afAuth.auth.currentUser.uid;
   }


   private handleErrorOrSuccess( 
     cb : () => Promise<firebase.auth.UserCredential>
   ) {
     cb()
     .then(data=> this.authenticatedUser(data))
     .catch(e => this.handleSignUpLoginError(e));
   }

   private authenticatedUser(UserCredential) {
    const {
      user : {email, uid} 
    } = UserCredential; 
    this.isLoading$.next(false);
   }

    private handleSignUpLoginError(error: {code: string; message: string}) {
        this.isLoading$.next(false);
        const erroMessage = error.message;
        this.authErrorMessages$.next(erroMessage);
    }

}
