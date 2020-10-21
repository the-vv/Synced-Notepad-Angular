import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private spinner: NgxSpinnerService,
    public auth: AuthenticationService
  ) {
    window.addEventListener('load', () => {
      // 1st, we set the correct status when the page loads
      this.auth.isOnline = navigator.onLine ? true : false;
      if (!this.auth.isOnline) {
        this.spinner.show()
      }
      // now we listen for network status changes
      window.addEventListener('online', () => {
        this.auth.isOnline = true;
        this.spinner.hide()
      });

      window.addEventListener('offline', () => {
        this.auth.isOnline = false;
        this.spinner.show()
      });
    });
  }
}
