import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private toastr: ToastrService, private auth: AuthService) {

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
      .then((res: CognitoUser) => {
        console.log(res);
        // res.authenticateUser();

        Auth.currentAuthenticatedUser()
          .then(res => {
            console.log("hello", res);
            
          });
          
      })
      .catch(console.log);
  }
}
