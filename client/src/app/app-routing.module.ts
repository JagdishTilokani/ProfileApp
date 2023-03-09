import { AuthGuard } from './Components/Auth/auth.guard';
import { HomeComponent } from './Components/home/home.component';
import { ConfirmSignupComponent } from './Components/Auth/confirm-signup/confirm-signup.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { UsersComponent } from './Components/users/users.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "confirm-signup", component: ConfirmSignupComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
