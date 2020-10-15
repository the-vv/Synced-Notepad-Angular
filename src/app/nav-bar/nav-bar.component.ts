import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public router: Router,
    public location: Location,
    public auths: AuthenticationService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    
    this.auths.user$.subscribe((user) =>{
      console.log(user?user:"Logged Out");      
    })
  }

}
