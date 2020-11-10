export class SignUpForm {
    constructor(
    public _email:string,
    public _password:string,
    public _confirmarPassword: string,
    public _fullname: string,
    public _rol: string,
    public _rango: string,
    public _fechaNacimiento: Date,
    ) { }
}