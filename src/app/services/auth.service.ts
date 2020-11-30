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
import { Subject, BehaviorSubject,ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  public client: Client;
  public user: Observable<InternalUser>;
  public internalUser: InternalUser;
  public constantsCollections: Constants.Collections;
  public newUser: InternalUser;
  public constantsGeneral: Constants.General;
  public rol: Role;
  public clientId: string = "";
  public userId: string;

  private clientIdSource = new  BehaviorSubject(this.clientId);
  currentMessage = this.clientIdSource.asObservable();
  
  public userLogged: InternalUser;
  public userLoggedRole: Role;

  userData: any; // Save logged in user data
  

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    this.rol = new Role('','','')
    //this.internalUser = new InternalUser('','','','', this.rol,'','', new Date);
    this.clientId = 'QaZsHtiJdvq8c4HYFGa3';
    this.userId = ''
    
    this.userLoggedRole = new Role('','','')
    this.userLogged = new InternalUser('','','','',this.userLoggedRole,'','',new Date)

    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        console.log(JSON.parse(localStorage.getItem('user')))
        console.log(this.userData.uid)
        this.getUserData(this.userData.uid);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

    /*
    this._user = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<InternalUser>(`users/${user.uid}`).valueChanges();
          console.log(user)
        }
        return of(null);
      })
    );
    */
  }

  getCurrentUserID(): string {
    console.log('AUTH SERVICE - get user ID: ' + this.userId)
    return this.userId
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
<<<<<<< HEAD
        //this.updateUserData(user);
        //this.getUserData(user.uid);
        console.log('Login UID: ' + user.uid)
        this.userId = user.uid
=======
        console.log('login entrado auth.service' + user)
        this.getUserData(user.uid)
>>>>>>> f87dbf92f9fe8c19b1e73371bc23c67d8b9dbe61
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    
    getUserData(userId: string): InternalUser {
<<<<<<< HEAD
      console.log('getUserData with USER ID: ' + userId)
      this.userId = userId

=======
      console.log('getUserData')

      var userLoggedRole: Role;
      userLoggedRole = new Role('','','');
      
>>>>>>> f87dbf92f9fe8c19b1e73371bc23c67d8b9dbe61
      var docRef = this.firestore.collection("Users").doc(userId);

      docRef.get().toPromise().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
<<<<<<< HEAD
          
          this.userLogged.uid = doc.data()['id']
          this.userLogged.email = doc.data()['email']
          this.userLogged.fullname = doc.data()['fullname']
          this.userLogged.clienteId = doc.data()['clienteId']
          this.userLogged.rol = doc.data()['rol']
          this.userLogged.photoURL = doc.data()['photoURL']
          this.userLogged.fechaBaja = doc.data()['fechaBaja']
          this.userLogged.fechaNacimiento = doc.data()['fechaNacimiento']
=======

          userLogged.uid = doc.data()['id']
          userLogged.email = doc.data()['email']
          userLogged.fullname = doc.data()['fullname']
          userLogged.clienteId = doc.data()['clienteId']
          userLogged.rol = doc.data()['rol']
          userLogged.photoURL = doc.data()['photoURL']
          userLogged.fechaBaja = doc.data()['fechaBaja']
          userLogged.fechaNacimiento = doc.data()['fechaNacimiento']
>>>>>>> f87dbf92f9fe8c19b1e73371bc23c67d8b9dbe61
          
          console.log('user logged: ' + userLogged);

          this.internalUser = new InternalUser('','','','', userLoggedRole,'','', new Date);
          this.internalUser = userLogged;
          return userLogged;
        } else {
        console.log("No such document!");
    }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

<<<<<<< HEAD
      return this.userLogged;
    }  
=======
      return userLogged;
    }   

    SignOut() {
      return this.auth.signOut().then(() => {
        console.log('SignOut() auth.service')
        localStorage.removeItem('user');
      })
    }
>>>>>>> f87dbf92f9fe8c19b1e73371bc23c67d8b9dbe61
    

  }
