import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lovely-offline';
  notes$ : Observable<any[]>
  constructor(db : AngularFirestore) {
    this.notes$ = db.collection('notes').valueChanges();
    console.log(this.notes$);
  }



  
}
