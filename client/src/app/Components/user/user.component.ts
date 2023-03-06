import { Component, OnInit } from '@angular/core';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
    pictureName: string | null = null;

    constructor(private route: ActivatedRoute, private profileService: ProfileService) {
    }

    async ngOnInit() {
        try {
            this.userId = this.route.snapshot.paramMap.get('id');
            const res = await this.profileService.getProfile(this.userId!);
            console.log(res);

            this.profile = res.Item;
            if (this.userId) {
                this.pictureUrl = await this.profileService.getProfileImage(this.userId);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
