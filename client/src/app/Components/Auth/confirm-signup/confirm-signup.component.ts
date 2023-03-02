import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.css']
})
export class ConfirmSignupComponent {
  constructor(private toastr: ToastrService, private auth: AuthService) {

  }

  confirmationForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  get code() {
    return this.confirmationForm.get('code');
  }

  verifyCode() {
    // this.auth.verifyCode();
  }
}
