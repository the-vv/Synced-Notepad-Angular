import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  hide = true;
  signinCalled = false

  constructor(
    private spinner: NgxSpinnerService,
    public Auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.Auth.user$
      .subscribe((user => {
        if (user && !this.signinCalled) {
          this.spinner.hide()        
          this.router.navigate([this.Auth.redirectUrl ? this.Auth.redirectUrl : '/'])
        }else if(!user){
          this.spinner.hide()
          console.log('no user');          
        }
      }))
  }
 
  Glogin() {
    this.signinCalled = true;
    this.spinner.show()
    this.Auth.GoogleLogin()
      .then((url) => {
        this.spinner.hide()
        this.router.navigate([url ? url : '/'])
          .then((res) => {
          })
      })
      .catch((err) => {
        this.spinner.hide()
        console.log(err);
      })
  }

  FBLogin() {
    this.Auth.FacebookLogin()
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

}
