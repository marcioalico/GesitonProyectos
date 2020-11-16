import { Component, OnInit } from '@angular/core';
import { ClokingService } from '../../services/cloking.service';
import { Signing } from '../../Models/Signing';
import { InternalUser } from '../../Models/user.interface';
import { Role } from '../../Models/role.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public newSigning: Signing;
  public userLogged: InternalUser;
  public userLoggedRole: Role

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
  }

  getUserLogged() {
    this.userLogged = this.authService.userLogged
  }

  initialSingin() {
    console.log('initialSingin')
    this.clokingService.signInCloking(this.userLogged)
  }

}
