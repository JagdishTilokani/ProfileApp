import { ProfileService } from './../../../Services/profile.service';
import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService, private profileService: ProfileService) {

  }

  passwordVisible = false;
  formSubmitted = false;

  dummy = {
    name: "Sujal",
    DOB: null,
    height: "15",
    gender: "Male"
  }

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
    // this.auth.register(userData, this.password!.value!, (err, data) => {
    //   if (err) {

    //   }

    //   else {
    //     this.formSubmitted = true;
    //   }
    // });

    this.auth.register(this.email!.value!, this.password!.value!)
      .then(res => {

        const profile = {
          id: res.userSub,
          name: this.name!.value!,
          email: this.email!.value!,
          height: this.height!.value,
          birthdate: this.height!.value,
          gender: this.gender!.value,
          isConfirmed: false,
        }

        this.profileService.addProfile(profile)
          .then(res => {
            console.log("profile added: ", res);
            this.formSubmitted = true;
          })
          .catch(err => {
            console.error("Error adding profile ", err);
          })
      })
      .catch(console.error);
  }

  // Email confirmation
  confirmationForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  get code() {
    return this.confirmationForm.get('code');
  }

  verifyCode() {
    const metadata = {
      name: this.name!.value,
      birthdate: this.DOB!.value,
      height: String(this.height!.value),
      gender: this.gender!.value
    }

    console.log(metadata);

    this.auth.verifyCode(this.email!.value!, this.code!.value!, metadata)
      // this.auth.verifyCode("jagdishtilokani835@gmail.com", this.code!.value!, this.dummy)
      .then(console.log)
      .catch(console.error);
  }
}
