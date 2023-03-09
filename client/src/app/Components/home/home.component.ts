import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  email?: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.loginStatusEmitter.subscribe(info => {
      this.email = info.email;
    });

    this.auth.setLoginStatus();
  }
}
