import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { default as _config } from "../../config.json";
import { Subject } from 'rxjs';

interface ILoginInfo {
    isLoggedIn: boolean,
    isAdmin?: boolean,
    id?: string,
    email?: string
}

export interface IUserData {
    name: string,
    // email: string,
    // height?: number | null,
    // birthdate?: string | null,
    // gender?: string | null
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    public loginStatusEmitter = new Subject<ILoginInfo>();

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

    async getCredentials() {
        const credentials = await Auth.currentCredentials();
        return Auth.essentialCredentials(credentials);
    }

    async getIdToken() {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        return token;
    }

    async isAdmin() {
        const user = await Auth.currentAuthenticatedUser();
        return user.signInUserSession.accessToken.payload['cognito:groups']?.includes('Admins');
    }

    async setLoginStatus() {
        try {
            const user = await Auth.currentAuthenticatedUser();

            const isAdmin = user.signInUserSession.accessToken.payload['cognito:groups']?.includes('Admins');
            this.loginStatusEmitter.next({
                isLoggedIn: true,
                isAdmin: isAdmin,
                id: user.attributes.sub,
                email: user.attributes.email
            });
        }
        catch (err) {
            this.loginStatusEmitter.next({
                isLoggedIn: false,
                isAdmin: false
            });
        }
    }

    async login(email: string, password: string) {
        return Auth.signIn(email, password);
    }

    async register(email: string, password: string) {
        return Auth.signUp({
            username: email,
            password: password
        });
    }

    async verifyCode(email: string, code: string, metadata: any) {
        return Auth.confirmSignUp(email, code, {
            clientMetadata: metadata
        });
    }

    async logOut() {
        return Auth.signOut();
    }
}
