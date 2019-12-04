import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-note-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {
  noteForm : FormGroup;

  @Input() 
  note;

  @Output() 
  sendError = new EventEmitter();

  @Output() 
  saveNote= new EventEmitter();

  constructor(private fb : FormBuilder) { }

  ngOnInit() {

    this.createForm();

    if(this.note) {
      this.noteForm.patchValue(this.note);
    }
  }

  createForm() {
    this.noteForm = this.fb.group({
      title : ["" , Validators.required],
      content : ["", Validators.required]
    });
  }

  addNote() {
    if(this.noteForm.valid) {
      this.saveNote.emit(this.noteForm.value);
    } else {
      this.sendError.emit("Please fill all the fields");
    } 
  }

}




