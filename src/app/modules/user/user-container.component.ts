import { Component, OnInit } from '@angular/core';
import { FirebaseAuthServiceService } from '../core/firebase-auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  public errorMessges$  = this.authService.authErrorMessages$;
  public user$ = this.authService.user$;
  public isLoading$ = this.authService.isLoading$;
  public loginForm : FormGroup
  public hide = true;

  constructor(private authService : FirebaseAuthServiceService, private fb: FormBuilder) {
    this.createLoginForm();
   }

  ngOnInit() {

    


  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  public signUp() {
    this.checkFormValidity(()=> {
      this.authService.signUpFirebase(this.loginForm.value);
    });
  }

  public login() {
    this.checkFormValidity(()=> {
      this.authService.signUpFirebase(this.loginForm.value);
    });
  }

  private checkFormValidity(cb) {
    if(this.loginForm.valid) {
      cb();

    } else {
      this.errorMessges$.next("Please enter correct Email and Password value");
    }
  }

  public logOut() {
    this.authService.logOutFirebase();
  }

  public getErrorMessage(controlName: string, erroName: string) :string  {
    const control = this.loginForm.get(controlName);
    return control.hasError("required") ? "You must enter a value" 
                                        : control.hasError(erroName)
                                        ? `not a valide ${erroName}`
                                        : "";
  }     
 
}
