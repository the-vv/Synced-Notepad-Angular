import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';  
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthenticationService } from '../app/services/authentication.service';

import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

// import { firebaseConfig } from '../app/enviornments/envs'
var firebaseConfig = {
  apiKey: "AIzaSyCRAE1JLUe2Nt8sWFo5_RhVuId_2vMgrZM",
  authDomain: "registration-91b64.firebaseapp.com",
  databaseURL: "https://registration-91b64.firebaseio.com",
  projectId: "registration-91b64",
  storageBucket: "registration-91b64.appspot.com",
  messagingSenderId: "444371260564",
  appId: "1:444371260564:web:2788701b699b8b9d75d081"
}; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomeComponent
  ],
  imports: [    
   AngularFireAuthModule,
   AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,    
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
