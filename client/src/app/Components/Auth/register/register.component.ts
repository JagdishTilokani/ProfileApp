import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService) {

  }

  passwordVisible = false;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    height: new FormControl(),
    DOB: new FormControl(),
    gender: new FormControl(),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', Validators.required),
  });

  get name() {
    return this.registerForm.get('name')
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get cpassword() {
    return this.registerForm.get('cpassword');
  }

  get DOB() {
    return this.registerForm.get('DOB');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get height() {
    return this.registerForm.get('height');
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRegister() {
    console.log(this.registerForm);
    
    // this.registerForm.setErrors({
    //   invalidLogin: true
    // })

    this.auth.register(this.email!.value!, this.password?.value!, this.name!.value!, this.DOB?.value, this.height!.value, this.gender!.value)
      .then(console.log)
      .catch(console.error);
    
  }
}
