import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './Components/Home/home-component/home-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './Components/Login/login-component/login-component.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Constants } from '../app/Utils/Constants';
import { SignupComponentComponent } from './Components/SignUp/signup/signup.component';
import { Routes, RouterModule, Router, ROUTES } from '@angular/router';
import { CreateProjectComponent } from './Components/create-project/create-project.component';
import { HomeComponent } from './Components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, HomeComponentComponent, LoginComponentComponent, SignupComponentComponent, CreateProjectComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    FormsModule,
    MatToolbarModule
  ],
  providers: [Constants.General, Constants.Collections],
  bootstrap: [AppComponent],
})

export class AppModule {}
