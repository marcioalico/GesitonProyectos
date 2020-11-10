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

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public _user: Observable<InternalUser>;
  public internalUser: InternalUser;
  public constantsCollections: Constants.Collections;
  

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
        email: cred.user.email
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
      const userRef: AngularFirestoreDocument<InternalUser> = this.firestore.doc(
        `users/${user.uid}`
      );
  
      const data: InternalUser = {
        uid: user.uid,
        clienteId: user.clienteId,
        email: user.email,
        fullname: user.fullname,
        rol: user.rol,
        photoURL: user.photoURL,
        fechaBaja: user.fechaBaja,
        fechaNacimiento: user.fechaNacimiento
      }
    //  const data: User = {
    //    uid: user.uid,
    //    email: user.email,
    //    emailVerified: user.emailVerified,
    //    displayName: user.displayName,
    //   photoURL: user.photoURL
    //  };
      userRef.update(data).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        }  else {
          alert(errorMessage);
      }
        console.log(error);
      });
      
      //return userRef.set(data, { merge: true });
    }

  }
