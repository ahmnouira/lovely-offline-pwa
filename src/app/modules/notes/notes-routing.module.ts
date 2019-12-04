import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';

const routes: Routes = [
  {path:"", component: NotesListComponent}, 
  {path: "add", component: NotesAddComponent}, 
  {path: ":id", component: NotesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
