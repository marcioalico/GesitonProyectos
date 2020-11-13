import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { User } from 'firebase';
//import { auth, User } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InternalUser } from '../Models/user.interface';
import { Constants } from '../Utils/Constants';
import { SignUpForm } from '../Models/SignUpForm';
import { User } from 'firebase';
import { Client } from '../Models/Client';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  public client: Client;
  public _user: Observable<InternalUser>;
  public internalUser: InternalUser;
  public constantsCollections: Constants.Collections;
  public newUser: InternalUser;
  public constantsGeneral: Constants.General;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    this._user = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<InternalUser>(`users/${user.uid}`).valueChanges();
          console.log(user)
        }
        return of(null);
      })
    );
  }



  createUser(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.firestore.collection('Users').doc(cred.user.uid).set({
        id: cred.user.uid,
        email: cred.user.email,
        photoURL: cred.user.photoURL
      })
    }).then(() => {
      
     console.log("Documento creado - limpliar form")
    })
  }

  
    async login(email: string, password: string): Promise<User> {
      try {
        const { user } = await this.auth.signInWithEmailAndPassword(
          email,
          password
        );
        //this.updateUserData(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    public updateUserData(user: InternalUser) {
      console.log('updateUserData action')
      this.firestore.collection('Users').doc(this.internalUser.uid).set({
        id: this.internalUser.uid,
        clienteId: this.constantsGeneral.clientId,
        email: user.email,
        fullname: user.fullname,
        rol: user.rol,
        photoURL: user.photoURL,
        fechaBaja: user.fechaBaja,
        fechaNacimiento: user.fechaNacimiento
      })
      //return userRef.set(data, { merge: true });
    }

  }
