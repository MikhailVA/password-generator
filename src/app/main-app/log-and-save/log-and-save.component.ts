import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, switchMap, of } from 'rxjs';

export interface Password {
  password: string;
  docID?: string;
  uid?: string;
};


@Component({
  selector: 'app-log-and-save',
  templateUrl: './log-and-save.component.html',
  styleUrls: ['./log-and-save.component.css']
})
export class LogAndSaveComponent {
  @Input() currentPassword: string = '';
  users$: Observable<any>;
  currentUser: string | undefined = '';




  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore
  ) {
    this.users$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection<Password>('users').doc(user.uid).collection('passwords').valueChanges()
        } else
          return of(null)
      })
    )
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      this.currentUser = user.user?.uid
    }).catch(function (error) {
      console.error(error)
    });
  }
  logout() {
    this.auth.signOut();
  }

  savePassword() {
    this.afs.collection('users').doc(this.currentUser).collection('passwords').add({ password: this.currentPassword })
      .then(docRef => {
        docRef.update({ docID: docRef.id, uid: this.currentUser })
      })
  }

  deletePassword(id: string | undefined) {
    this.afs.collection('users').doc(this.currentUser).collection('passwords').doc(id).delete()
  }



}
