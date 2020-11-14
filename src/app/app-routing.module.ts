import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './Components/Home/home-component/home-component.component';
import { LoginComponentComponent } from './Components/Login/login-component/login-component.component';


const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: '**', component: HomeComponentComponent },
  { path: 'Index', component: HomeComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
