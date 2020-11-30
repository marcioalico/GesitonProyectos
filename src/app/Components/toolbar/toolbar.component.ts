import { Component, OnInit } from '@angular/core';
import { ClokingService } from '../../services/cloking.service';
import { Signing } from '../../Models/Signing';
import { InternalUser } from '../../Models/user.interface';
import { Role } from '../../Models/role.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [AuthService]
})
export class ToolbarComponent implements OnInit {

  public newSigning: Signing;
  public userLogged: InternalUser;
  public userLoggedRole: Role;
  public clienteId: string = "";

  constructor
  (
    private clokingService: ClokingService, 
    private authService: AuthService
  )
  {
      this.newSigning = new Signing('','','','','');
      this.userLoggedRole = new Role('','','');
      this.userLogged = new InternalUser('','','','',this.userLoggedRole,'','',new Date())
  }

  ngOnInit(): void {
    this.getUserLogged()
    this.authService.currentMessage.subscribe(clienteId => (this.clienteId= clienteId));
  }

  getUserLogged() {

    /*
    console.log('getUserLogged()')
    console.log(this.authService.userLogged)
    this.userLogged = this.authService.userLogged
    */
    console.log('AUTH SERVICE USER ID ' + this.clienteId)
    this.userLogged = this.authService.getUserData(this.clienteId)
  }

  initialSingin() {
    console.log('initialSingin')
    this.getUserLogged()
    console.log(this.userLogged)
    this.clokingService.signInCloking(this.userLogged)
  }

}
