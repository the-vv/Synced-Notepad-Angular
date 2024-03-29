import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from '../app/services/authentication.service';
import { NotesService } from '../app/services/notes.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';

import { firebaseConfig } from '../app/enviornments/envs'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from "ngx-spinner";

import { NoteCardComponent } from './note-card/note-card.component';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';
import { NotesContainerComponent } from './notes-container/notes-container.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomeComponent,
    NotesContainerComponent,
    NavBarComponent,
    NoteCardComponent,
    NoteViewComponent,
    CreateNoteComponent,
    PageNoteFoundComponent,
    ConfirmationComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
      {
        enabled: environment.production,
        registrationStrategy: "registerImmediately"
      })
  ],
  providers: [
    AuthenticationService,
    NotesService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
