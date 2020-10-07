import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';
import { NotesContainerComponent } from './notes-container/notes-container.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { AuthGuard } from './auth-guard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponentComponent },
  // { path: 'notes', component: NotesContainerComponent, canActivate: [AuthGuard]},  
  {path: 'notes', component: NotesContainerComponent}, 
  {path: 'notes/:id', component: NoteViewComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: '**', redirectTo: '/home', pathMatch: 'full' },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }