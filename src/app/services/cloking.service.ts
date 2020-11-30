import { Injectable } from '@angular/core';
import { Role } from '../Models/role.interface';
import { User } from 'firebase';
import { InternalUser } from '../Models/user.interface';
import { Constants } from '../Utils/Constants';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ClokingService {

  public userLogged: InternalUser;
  public userLoggedRole: Role;

  public clientId: string;

  public constantsGeneral: Constants.General;
  public constantsCollections: Constants.Collections;

  constructor(private firestore: AngularFirestore) { 
    this.userLoggedRole = new Role('','','')
    this.userLogged = new InternalUser('','','','',this.userLoggedRole,'','',new Date)
    this.clientId = 'QaZsHtiJdvq8c4HYFGa3';
  }

  getUserLogged() {
    
  }

  signInCloking(user: InternalUser) {
<<<<<<< HEAD
    var docRef = this.firestore.collection('Cloking').doc(user._uid);
=======
    var docRef = this.firestore.collection('Cloking').doc(user.uid);
>>>>>>> f87dbf92f9fe8c19b1e73371bc23c67d8b9dbe61
    var newDate = new Date();
    var newHour = new Date().getHours;
    var newMinutes = new Date().getMinutes;

    docRef.set({
        clientId: this.clientId,
        finishSigning: '',
        initialSigning: ' ${ newDate } ${ newHour } ${ newMinutes }',
        module: 'module-id',
        user: user._uid
    })
    
  }
}
