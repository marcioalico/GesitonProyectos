import { Role } from '../Models/role.interface';


export class InternalUser {
  constructor(
    public uid: string,
    public clienteId: string,
    public email: string,
    public fullname: string,
    public rol?: Role,
    public photoURL?: string,
    public fechaBaja?: string,
    public fechaNacimiento?: Date,
    ) {}
  
  set _uid(uid:string) {
      this.uid = uid
  }

  set _clienteId(clienteId:string) {
    this.clienteId = clienteId
  }

  set _email(email:string) {
    this.email = email
  }

  set _fullname(fullname: string) {
    this.fullname = fullname
  }

  set _rol(rol: Role) {
    this.rol = rol
  }

  set _photoURL(photoURL: string) {
    this.photoURL = photoURL
  }

  set _fechaBaja(fechaBaja: string) {
    this.fechaBaja = fechaBaja
  }

  set _fechaNacimiento(fechaNacimiento: Date) {
    this.fechaNacimiento = fechaNacimiento
  }

  get _uid(): string {
    return this.uid
  }

  get _clienteId(): string {
    return this.clienteId
  }

  get _email(): string {
    return this.email
  }

  get _fullname(): string {
    return this.fullname
  }

  get _rol(): Role {
    return this.rol
  }

  get _photoURL(): string {
    return this.photoURL
  }

  get _fechaBaja(): string {
    return this.fechaBaja
  }

  get _fechaNacimiento(): Date {
    return this.fechaNacimiento
  }
  
}


