import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';

export interface IProfile {
    name: string,
    email: string,
    birthdate?: string,
    gender?: string,
    height?: Number
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    profile: any = null;
    userId: string | null = null;
    pictureUrl: string | null = null;
    formSubmitted = false;
    selectedImage: any = null;

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private toastr: ToastrService) {
    }

    editForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl({ value: '', disabled: true }, Validators.required),
        height: new FormControl(),
        birthdate: new FormControl(),
        gender: new FormControl(),
        image: new FormControl(),
    });

    get name() {
        return this.editForm.get('name')
    }

    get birthdate() {
        return this.editForm.get('birthdate');
    }

    get gender() {
        return this.editForm.get('gender');
    }

    get height() {
        return this.editForm.get('height');
    }

    onImageSelect(inputImage: any) {
        this.selectedImage = inputImage.files[0];
        this.readImage();
    }

    readImage() {
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.pictureUrl = event.target.result;
        });

        reader.readAsDataURL(this.selectedImage!);
    }

    async ngOnInit() {
        try {
            this.userId = this.route.snapshot.paramMap.get('id');
            const res = await this.profileService.getProfile(this.userId!);
            this.profile = res.Item;

            this.editForm.patchValue({
                name: this.profile.name.S,
                email: this.profile.email.S,
                gender: this.profile.gender?.S || null,
                birthdate: this.profile.birthdate?.S || null,
                height: this.profile.height?.N || null
            })


            if (this.userId) {
                const res = await this.profileService.getProfileImage(this.userId);
                if (res.Body instanceof Uint8Array) {
                    this.selectedImage = new Blob([res.Body]);
                    this.readImage();
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    async onSubmit() {
        try {
            const updatedUser = {
                id: this.userId,
                name: this.name!.value,
                gender: this.gender!.value,
                birthdate: this.birthdate!.value,
                height: this.height!.value
            }

            await this.profileService.updateProfile(updatedUser);
            if (this.selectedImage) {
                this.profileService.addProfileImage(this.userId!, this.selectedImage);
            }
            this.toastr.success("Profile Updated Successfully");
            this.editForm.markAsPristine();
        }

        catch (err) {
            console.error(err);
        }
    }
}
