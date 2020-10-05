import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public auths: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auths.user$.subscribe((user) =>{
      console.log(user?user:"Logged Out");      
    })
  }

}
