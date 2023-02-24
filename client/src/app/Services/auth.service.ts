import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { default as _config } from "../../config.json";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: _config.cognito.REGION,
        userPoolId: _config.cognito.USER_POOL_ID,
        userPoolWebClientId: _config.cognito.APP_CLIENT_ID
      }
    });
  }

  login(email: string, password: string): Promise<any> {
    return Auth.signIn(email, password);
  }

  register() {
    // Auth.signUp();
  }
}
