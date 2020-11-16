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
import { Role } from '../Models/role.interface';

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
  public rol: Role;
  public clientId: string;
  public userId: string;
  
  public userLogged: InternalUser;
  public userLoggedRole: Role;
  

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    this.rol = new Role('','','')
    this.internalUser = new InternalUser('','','','', this.rol,'','', new Date)
    this.clientId = 'QaZsHtiJdvq8c4HYFGa3';
    this.userId = ''
    
    this.userLoggedRole = new Role('','','')
    this.userLogged = new InternalUser('','','','',this.userLoggedRole,'','',new Date)
    
    
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



  createUser(email: string, password: string, user: InternalUser) {
    this.auth.createUserWithEmailAndPassword(email, password).then(cred => {

      this.internalUser.email = cred.user.email;
      this.internalUser.uid = cred.user.uid;

      this.firestore.collection('Users').doc(cred.user.uid).set({
        id: cred.user.uid,
        email: cred.user.email,
        photoURL: cred.user.photoURL
      })

      this.firestore.collection('Users').doc(cred.user.uid).set({
        id: cred.user.uid,
        clienteId: 'QaZsHtiJdvq8c4HYFGa3',
        email: cred.user.email,
        fullname: user.fullname,
        rol: {'clienteId': user.rol.clienteId,
              'description': user.rol.description,
              'rango': user.rol.rango},
        photoURL: user.photoURL,
        fechaBaja: user.fechaBaja,
        fechaNacimiento: user.fechaNacimiento
      }).then(() => { console.log("User document created"); })

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
        //this.getUserData(user.uid);
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    
    getUserData(userId: string): InternalUser {
      console.log('getUserData')
      var userLogged: InternalUser;
      var userLoggedRole: Role;
      var docRef = this.firestore.collection("Users").doc(userId);

      docRef.get().toPromise().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          

          userLoggedRole = new Role('','','');
          userLogged = new InternalUser('','','','',userLoggedRole,'','',new Date);

          userLogged.uid = doc.data()['id']
          userLogged.email = doc.data()['email']
          userLogged.fullname = doc.data()['fullname']
          userLogged.clienteId = doc.data()['clienteId']
          userLogged.rol = doc.data()['rol']
          userLogged.photoURL = doc.data()['photoURL']
          userLogged.fechaBaja = doc.data()['fechaBaja']
          userLogged.fechaNacimiento = doc.data()['fechaNacimiento']
          
          console.log('user logged: ' + this.userLogged);
          return this.userLogged;
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });

      return userLogged;
    }  
    

  }
