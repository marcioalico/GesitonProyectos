import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './Components/Home/home-component/home-component.component';
import { LoginComponentComponent } from './Components/Login/login-component/login-component.component';
import { SignupComponentComponent } from './Components/SignUp/signup/signup.component';


const routes: Routes = [
  { path: '', component: SignupComponentComponent },
  { path: '**', component: SignupComponentComponent },
  { path: 'index', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'signup', component: SignupComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
