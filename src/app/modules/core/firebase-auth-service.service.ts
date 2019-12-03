// create a angular firebase service that handles all the firebase authentication methdos //
// like login, Sing up

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, first} from 'rxjs/operators';

export interface User {
  email : string;
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthServiceService {

  // expose all data 
  public authErrorMessages$ = new Subject<string>();
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public user$ = new Subject<User>();

  // _Subject_: A Subject is a special type of Observale that allows values to be muticasted to many 
  // observers, subjects are like EventEmiiters 

  //_Behavior Subject_ : A Variant of Subject that requires an instance value and emits its current value whenever its 
  // is subsriced to

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn().subscribe();


  }

  private isLoggedIn() {
    return this.afAuth.authState.pipe(
      first(),
      tap(user => {
        this.isLoading$.next(false);    
        if (user) {
          const { email, uid } = user;
          this.user$.next({ email, uid });    // you can call 'next' to feed values as well as error and complete
        }
      })
    );
  }

  // register
  public signUpFirebase(user : User) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.uid);
    });
  }

  // login
  public loginFirebase({ email, password }) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    });
  }

  // logout
  public logOutFirebase() {
    this.isLoading$.next(true);
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.isLoading$.next(false);
        this.user$.next(null);
      })
      .catch(e => {
        console.error(e);
        this.isLoading$.next(false);
        this.authErrorMessages$.next("Something is wrong when signing out!");
      });
  }


  private handleErrorOrSuccess(
    cb: () => Promise<firebase.auth.UserCredential>
  ) {
    cb()
      .then(data => this.authenticateUser(data))
      .catch(e => this.handleSignUpLoginError(e));
  }


  private authenticateUser(UserCredential) {
    const {
      user: { email, uid }
    } = UserCredential;
    this.isLoading$.next(false);
    this.user$.next({ email, uid });
  }


  private handleSignUpLoginError(error: { code: string; message: string })
  {
    this.isLoading$.next(false);
    const errorMessage = error.message;
    this.authErrorMessages$.next(errorMessage);
  }


}
