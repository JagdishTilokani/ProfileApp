import { ProfileService } from './../../Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { default as _config } from "../../../config.json";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    // fetch(`${_config.api.invokeUrl}/users`)
    // .then(res => {
    //   return res.json()
    // })
    // .then(users => {
    //   this.users = users;
    // })
    // .catch(console.error);

    this.profileService.getAllUserProfiles((err, data) => {
      if (err) {
        console.error("callbakc error", err);
      }

      else {
        console.log(data);
      }
    })
  }
}
