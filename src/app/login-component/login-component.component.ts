import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  hide = true;
  signinCalled = false

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public Auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required,],
      description: '',
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
  get f() { return this.registerForm.controls; }
 
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

  onSubmit(){    
    if (!this.f.title.errors) {

    }
  }

}
