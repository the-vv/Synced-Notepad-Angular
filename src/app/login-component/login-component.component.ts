import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  
  hide = true;

  constructor(public Auth: AuthenticationService) { }

  ngOnInit(): void { 
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

  GLogin(){
    this.Auth.GoogleLogin()
    .then((user) => {   
      console.log(user);      
    })
    .catch((error) =>{
      console.log(error.message);      
    })
  }

}
