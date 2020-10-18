import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  hideC = true;
  signinCalled = false

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public Auth: AuthenticationService,
    private router: Router
  ) { }

  openSnackBar(message: string, action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['',Validators.required ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      confirmp: ['', Validators.required]
    }, {
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {
    });
    this.spinner.show()
    this.Auth.user$
      .subscribe((user => {
        if (user && !this.signinCalled) {
          this.spinner.hide()        
          this.router.navigate([this.Auth.redirectUrl ? this.Auth.redirectUrl : '/'], { replaceUrl: true })
        }else if(!user){
          this.spinner.hide()
          console.log('no user');          
        }
      }))
  }

  get rf() { return this.registerForm.controls; }
  get lf() { return this.loginForm.controls; }
 
  Glogin() {
    this.signinCalled = true;
    this.spinner.show()
    this.Auth.GoogleLogin()
      .then((url) => {
        this.spinner.hide()
        this.router.navigate([url ? url : '/'], { replaceUrl: true })
          .then((res) => {
          })
      })
      .catch((err) => {
        this.spinner.hide()
        console.log(err);
      })
  }

  FBLogin() {
    this.signinCalled = true;
    this.spinner.show()
    this.Auth.FacebookLogin()
      .then((url) => {
        this.spinner.hide()
        this.router.navigate([url ? url : '/'], { replaceUrl: true })
          .then((res) => {
          })
      })
      .catch((err) => {
        this.spinner.hide()
        console.log(err);
      })
  }

  onLogin(){        
    if(!this.loginForm.invalid){
      console.log(this.loginForm.value);      
    }
  }

  incorrectConfirm:boolean = false
  onRegister(){        
    if (!this.registerForm.invalid && !this.incorrectConfirm) {
      console.log(this.registerForm.value);  
      this.Auth.emailSignup(this.registerForm.value)    
      .then((res) =>{
        console.log(res);
        
      })
      .catch((err) =>{
        if(err.exists){
          this.openSnackBar("Account already exists")
        }
      })
    }
  }

  onRetypePassword(){
    this.registerForm.get('confirmp').valueChanges.subscribe(val =>{
      console.log(val);      
      let password = this.registerForm.value.password
      if(password != val){
        console.log('incorrect');
        this.incorrectConfirm = true
      } else {
        this.incorrectConfirm = false
      }
    })
  }

}
