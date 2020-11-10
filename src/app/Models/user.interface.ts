import { Role } from '../Models/role.interface';


export class InternalUser {
  constructor(
    uid: string,
    clienteId: string,
    email: string,
    fullname?: string,
    rol?: Role,
    photoURL?: string,
    fechaBaja?: string,
    fechaNacimiento?: string,
    ) {}
  
  set uid(uid:string) {
      this.uid = uid
  }

  set clienteId(clienteId:string) {
    this.clienteId = clienteId
  }

  set email(email:string) {
    this.email = email
  }

  set fullname(fullname: string) {
    this.fullname = fullname
  }

  set rol(rol: Role) {
    this.rol = rol
  }

  set photoURL(photoURL: string) {
    this.photoURL = photoURL
  }

  set fechaBaja(fechaBaja: string) {
    this.fechaBaja = fechaBaja
  }

  set fechaNacimiento(fechaNacimiento: string) {
    this.fechaNacimiento = fechaNacimiento
  }
}