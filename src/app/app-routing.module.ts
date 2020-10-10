import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';
import { NotesContainerComponent } from './notes-container/notes-container.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component'
import { AuthGuard } from './auth-guard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponentComponent },
  // { path: 'notes', component: NotesContainerComponent, canActivate: [AuthGuard]},  
  { path: 'notes', component: NotesContainerComponent, canActivate: [AuthGuard] },
  { path: 'notes/create', component: CreateNoteComponent, canActivate: [AuthGuard] },
  { path: 'notes/view/:id', component: NoteViewComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: '404', component: PageNoteFoundComponent }, // redirect to `404`
  { path: '**', redirectTo: '/404' },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }