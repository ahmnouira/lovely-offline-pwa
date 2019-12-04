import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { NotesCardComponent } from './notes-card/notes-card.component';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NotesListComponent, NotesAddComponent, NotesDetailsComponent, NotesCardComponent, NotesFormComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    SharedModule
  ]
})
export class NotesModule { }
