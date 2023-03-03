// import { InvalidLambdaResponseException } from '@aws-sdk/client-cognito-identity/';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../../Services/profile.service';
import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { InvalidLambdaResponseException } from "@aws-sdk/"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router) { }

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
    birthdate: new FormControl(),
    gender: new FormControl(),
    profileImage: new FormControl(),
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

  get birthdate() {
    return this.registerForm.get('birthdate');
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

  selectedImage: File | null = null;

  onImageSelect(inputImage: any) {
    this.selectedImage = inputImage.files[0];
  }

  onRegister() {
    // this.auth.register(this.email!.value!, this.password!.value!)
    //   .then(res => {
    //     this.formSubmitted = true;
    //   })
    //   .catch(console.error);

    const reader = new FileReader();

    reader.addEventListener('load', event => {
      console.log(JSON.stringify(event, null, 4));
      this.profileService.addProfileImage('abc', this.selectedImage!)
    });

    reader.readAsDataURL(this.selectedImage!);

    console.log(
      this.registerForm.get('profileImage')!.value
    );

    // this.profileService.addProfileImage(abc, )

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
      birthdate: this.birthdate!.value || null,
      height: String(this.height!.value) || null,
      gender: this.gender!.value || null
    }

    console.log(metadata);

    this.auth.verifyCode(this.email!.value!, this.code!.value!, metadata)
      .then(res => {
        this.auth.login(this.email!.value!, this.password!.value!)
          .then(res => {
            this.toastr.success("Email verified successfully.");
            this.router.navigate(["/"]);
          })
          .catch(err => {
            throw err
          });
      })
      .catch(err => {
        if (err instanceof Error) {
          this.toastr.error(err.message);
        }

        else {
          this.toastr.error("Please try again", "Something went wrong");
        }

        this.confirmationForm.setErrors({
          'Confirmation Error': true
        })
        console.error(err);
      });
  }
}
