import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  
  hide = true;
  signinCalled = false

  constructor(
    public Auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void { 
    this.Auth.user$
    .subscribe((user=>{
      if(user && !this.signinCalled){           
      this.router.navigate(['/'])
      }
    }))
  }

  Glogin(){
    this.Auth.GoogleLogin();
    this.signinCalled = true;
  }

  FBLogin(){
    this.Auth.FacebookLogin()
    .then((user) => {   
      console.log(user);      
    })
    .catch((error) =>{
      console.log(error.message);      
    })
  }

}
