import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private toastr: ToastrService, private auth: AuthService, private router: Router) {

  }

  passwordVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin() {
    this.auth.login(this.email!.value!, this.password!.value!)
      .then(res => {
          this.toastr.success("Logged in successfully");
          this.auth.setLoginStatus();          
          this.router.navigate(["/"]);
      })
      .catch(err => {
        this.toastr.error("Invalid email or password");
      });
  }
}
