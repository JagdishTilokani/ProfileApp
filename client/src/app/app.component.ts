import { AuthService } from './Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {}

  title = 'client';

  ngOnInit() {
    this.auth.configure();
  }
}
