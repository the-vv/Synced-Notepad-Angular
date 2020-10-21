import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private spinner: NgxSpinnerService,
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(!this.auth.isOnline){
      this.spinner.show()
    }
  }

}
