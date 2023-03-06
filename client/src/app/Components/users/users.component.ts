import { ProfileService } from './../../Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { default as _config } from "../../../config.json";
import { ItemList } from 'aws-sdk/clients/dynamodb';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: ItemList | null = null;

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        this.fetchUsers();
    }

    async fetchUsers() {
        try {
            const res = await this.profileService.getAllUserProfiles();
            this.users = res.Items!;
        }

        catch (err) {
            console.log(err);
        }
    }

    //   fetchUsers() {
    //     // fetch(`${_config.api.invokeUrl}/users`)
    //     // .then(res => {
    //     //   return res.json()
    //     // })
    //     // .then(users => {
    //     //   this.users = users;
    //     // })
    //     // .catch(console.error);

    //     this.profileService.getAllUserProfiles((err, data) => {
    //       if (err) {
    //         console.error("Error getting all users", err);
    //       }

    //       else {
    //         this.users = data.Items!;
    //       }
    //     })
    //   }

    viewProfile(id: string) {

    }
}
