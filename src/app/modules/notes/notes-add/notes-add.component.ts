import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent{

  public userID;
  public errorMessages$ = new Subject();
  // SnackBarService ??!!!
  constructor(private router : Router, private data: DataService ) { }


  onSaveNote(values) {
    this.data.addNote(values).then(doc => {
      this.router.navigate(["/notes"]);
      // snackBar.open ??!
    }).catch(e => {
      this.errorMessages$.next("Something is wrong when adding to DB")
    });
  }

  onSendError(message){
    this.errorMessages$.next(message);
  }

 
}
