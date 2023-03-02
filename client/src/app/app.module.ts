import { ProfileService } from './Services/profile.service';
import { AuthService } from './Services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UsersComponent } from './Components/users/users.component';
import { UserComponent } from './Components/user/user.component';
import { ConfirmSignupComponent } from './Components/Auth/confirm-signup/confirm-signup.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserComponent,
    ConfirmSignupComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [AuthService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
