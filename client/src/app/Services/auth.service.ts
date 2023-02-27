import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { default as _config } from "../../config.json";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  configure() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: _config.region,
        userPoolId: _config.cognito.USER_POOL_ID,
        userPoolWebClientId: _config.cognito.APP_CLIENT_ID,
        identityPoolId: _config.cognito.IDENTITY_POOL_ID
      }
    });
  }

  login(email: string, password: string): Promise<any> {
    return Auth.signIn(email, password);
  }

  register(email: string, password: string, name: string, DOB: string | null, height: number | null, gender: string | null) {
    const params = {
      username: email,
      password: password,
      attributes: {
        email: email
      },
      clientMetadata: {
        name: name,
        birthdate: DOB ? DOB: '',
        height: height ? String(height): '',
        gender: gender ? gender: '',
      }
    }

    console.log(params);

    return Auth.signUp(params);
  }
}
