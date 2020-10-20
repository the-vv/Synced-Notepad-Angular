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

  openSnackBar(message: string, dur: number = 3000, action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: dur,
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
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
    if (this.Auth.isOnline) {
      this.spinner.show()
      this.Auth.user$
        .subscribe((user => {
          if (user && !this.signinCalled) {
            this.spinner.hide()
            this.router.navigate([this.Auth.redirectUrl ? this.Auth.redirectUrl : '/'], { replaceUrl: true })
          } else if (!user) {
            this.spinner.hide()
            // console.log('no user');
          }
        }))
    }
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

  wrongPass = false
  onLogin() {
    if (!this.loginForm.invalid) {
      this.spinner.show()
      this.wrongPass = false
      // console.log(this.loginForm.value);
      this.Auth.emailLogin(this.loginForm.value)
        .then((res) => {
          this.spinner.hide()
          // console.log(res);
          this.loginForm.reset()
          this.router.navigate([this.Auth.redirectUrl ? this.Auth.redirectUrl : '/'], { replaceUrl: true })
        })
        .catch((err) => {
          this.spinner.hide()
          console.log(err);
          if (err.wrongPassword) {
            this.wrongPass = true
            this.loginForm.controls.password.reset()
          }
          else if (err.userNotFound) {
            this.openSnackBar('No user found with this email', 5000)
            this.loginForm.reset()
          } else {
            this.openSnackBar(err.message)
            this.loginForm.reset()
          }
        })
    }
  }

  incorrectConfirm: boolean = false
  onRegister() {
    if (!this.registerForm.invalid && !this.incorrectConfirm) {
      this.spinner.show()
      // console.log(this.registerForm.value);
      this.Auth.emailSignup(this.registerForm.value)
        .then((res) => {
          this.spinner.hide()
          // console.log(res);
          this.router.navigate([this.Auth.redirectUrl ? this.Auth.redirectUrl : '/'], { replaceUrl: true })
        })
        .catch((err) => {
          this.spinner.hide()
          if (err.exists) {
            this.openSnackBar("Account already exists", 5000)
            this.registerForm.reset()
          } else {
            this.openSnackBar(err.message)
            this.registerForm.reset()
          }
        })
    }
  }

  onRetypePassword() {
    this.registerForm.get('password').valueChanges.subscribe(val => {
      let password = this.registerForm.value.confirmp
      if (password != val) {
        // console.log('incorrect');
        this.incorrectConfirm = true
      }
    })
    this.registerForm.get('confirmp').valueChanges.subscribe(val => {
      // console.log(val);
      let password = this.registerForm.value.password
      if (password != val) {
        // console.log('incorrect');
        this.incorrectConfirm = true
      } else {
        this.incorrectConfirm = false
      }
    })
  }

}
