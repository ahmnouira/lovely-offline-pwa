import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../core/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss']
})
export class NotesDetailsComponent implements OnInit {

  public errorMessages$ = new Subject();

  public isDbLoading$;

  public note$;

  public isEdit;

  private id;

  constructor(

    private data: DataService, 
    private route: ActivatedRoute,
    private router : Router
    //  private snackBar : SnackBarService;
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    this.note$ = this.data.getNote(id);
    this.isDbLoading$ = this.data.isLoading$;
  }

  delete() {
    if(confirm("Are you sure?")) {
      this.data.deleteNote(this.id).then(() => {
        this.router.navigate(['/notes']);
        
      }).catch(e => {
        console.log("Unable to delete this note");
      });
    }
  }

  edit() {
    this.isEdit =! this.isEdit;
  }

  saveNote(values) {
    this.data.editNote(this.id, values).then(() => {
      this.edit();
    }).catch(e => {
      this.edit();
    });
  }

  sendError(message) {
    this.errorMessages$.next(message);
  }

}
