import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';  
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthenticationService } from '../app/services/authentication.service';

import {firebaseConfig} from '../app/enviornments/envs'

import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NotesContainerComponent } from './notes-container/notes-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomeComponent,
    NotesContainerComponent
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
