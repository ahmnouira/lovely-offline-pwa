// this service contains a standard set of CRUD methods (create, read, update, and delete) functionalites
// such as fecthing all notes, add, update and delete, and fetch detail note.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map, tap, catchError } from  'rxjs/operators';

export interface Note {
  id: string;
  title: string;
  content : string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  protected readonly USERS_COLLECTION = "users";
  protected readonly NOTES_COLLECTION = "notes";
  public isLoading$  = new BehaviorSubject<boolean>(true);

  constructor(private afDB : AngularFirestore, private auth : AuthService) {
    console.log(this.USERS_COLLECTION + "/" + this.auth.id + "/" + this.NOTES_COLLECTION);
  }


  getUsersNotesCollections() {
    return this.afDB.collection(this.USERS_COLLECTION + "/" + this.auth.id + "/" + this.NOTES_COLLECTION, query => query.orderBy("updated_at", "desc"));
  }


  public get timestamp() : number {
    return new Date().getTime();
  }

  addNote(note): Promise<DocumentReference>{
    return this.getUsersNotesCollections().add({
      ...note,
      created_at : this.timestamp,
      updated_at : this.timestamp
    });
  }

  editNote(id: string, note)  {
    return this.getUsersNotesCollections().doc(id).update({
      ...note,
      updated_at : this.timestamp
    });
  }

  deleteNote(id: string): Promise<void> {
  return this.getUsersNotesCollections().doc(id).delete();
  }


  getNote(id) : Observable<Note> {
    return this.getUsersNotesCollections().doc(id).snapshotChanges().pipe(map(snapshot  => {
      const data = snapshot.payload.data() as Note;
      const id = snapshot.payload.id; 
      return {id, ...data};

    }),catchError(e => throwError(e))
    );
  }


  getNotes() {
    return this.getUsersNotesCollections().snapshotChanges().pipe(map(snapshot => snapshot.map(value => {
      // Get Document Data
      const data = value.payload.doc.data() as Note;
      // Get Id 
      const id  = value.payload.doc.id;

      // use the spread operator to add the id to the document data
      return {id, ...data};

      })),tap(notes => {
        this.isLoading$.next(false);
      }), catchError(e => throwError(e))

    );
}

}
