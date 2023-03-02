import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn = false;
  isAdmin?: boolean;
  userId?: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.loginStatusEmitter.subscribe(loginInfo => {
      this.isLoggedIn = loginInfo.isLoggedIn;
      this.isAdmin = loginInfo.isAdmin;
      this.userId = loginInfo.id;
    });

    this.auth.setLoginStatus();
  }

  onLogOut() {
    this.auth.logOut()
      .then(res => {
        this.auth.setLoginStatus();

        console.log("then this");

        this.router.navigate(["/"]);
      })
  }
}
