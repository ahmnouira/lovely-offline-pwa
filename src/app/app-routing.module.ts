import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", redirectTo: "/notes", pathMatch: "full"},
  {path: 'user', loadChildren: './modules/user/user.module#UserModule'},       // load the user Module
  {path: "notes", loadChildren: './modules/notes/notes.module#NotesModule'},   // load the notes Module
  {path: "**", redirectTo: "/notes"}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
