import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get cpassword() {
    return this.registerForm.get('cpassword');
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRegister() {
    console.log(this.registerForm);
    
    this.registerForm.setErrors({
      invalidLogin: true
    })
  }
}
