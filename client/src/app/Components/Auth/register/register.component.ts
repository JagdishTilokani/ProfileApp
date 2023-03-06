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
    private selectedImage: File | null = null;

    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        height: new FormControl(),
        birthdate: new FormControl(),
        gender: new FormControl(),
        profileImage: new FormControl<File | null>(null),
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

    get profileImage() {
        return this.registerForm.get('profileImage');
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    onImageSelect(inputImage: any) {
        this.selectedImage = inputImage.files[0];
    }

    async onRegister() {
        try {
            await this.auth.register(this.email!.value!, this.password!.value!);
            this.formSubmitted = true;
        }

        catch (err) {
            console.error(err);
        }
    }

    // onRegister() {
    //     this.auth.register(this.email!.value!, this.password!.value!)
    //         .then(res => {
    //             this.formSubmitted = true;
    //         })
    //         .catch(err => {
    //             if (err instanceof Error) {
    //                 this.toastr.error(err.message);
    //             }

    //             else {
    //                 this.toastr.error("Please try again", "Something went wrong");
    //             }
    //         });
    // }

    // Email confirmation
    confirmationForm = new FormGroup({
        code: new FormControl('', Validators.required),
    });

    get code() {
        return this.confirmationForm.get('code');
    }

    async verifyCode() {
        const metadata = {
            name: this.name!.value,
            birthdate: this.birthdate!.value || null,
            height: String(this.height!.value) || null,
            gender: this.gender!.value || null
        }

        try {
            await this.auth.verifyCode(this.email!.value!, this.code!.value!, metadata);
            this.toastr.success("Email verified successfully.");

            const user = await this.auth.login(this.email!.value!, this.password!.value!);
            console.log(user);
            
            if (this.profileImage!.value) {
                await this.profileService.addProfileImage(user.username, this.profileImage!.value);
            }
            this.router.navigate(["/"]);
        }

        catch (err) {
            console.error(err);
        }
    }

    // verifyCode() {
    //     const metadata = {
    //         name: this.name!.value,
    //         birthdate: this.birthdate!.value || null,
    //         height: String(this.height!.value) || null,
    //         gender: this.gender!.value || null
    //     }

    //     this.auth.verifyCode(this.email!.value!, this.code!.value!, metadata)
    //         .then(res => {
    //             this.toastr.success("Email verified successfully.");
    //             this.router.navigate(["/"]);
    //             this.auth.login(this.email!.value!, this.password!.value!);
    //             return this.profileService.addProfileImage()
    //         })
    //         .then()
    //         .catch(err => {
    //             if (err instanceof Error) {
    //                 this.toastr.error(err.message);
    //             }

    //             else {
    //                 this.toastr.error("Please try again", "Something went wrong");
    //             }

    //             this.confirmationForm.setErrors({
    //                 'Confirmation Error': true
    //             })
    //             console.error(err);
    //         });
    // }
}
