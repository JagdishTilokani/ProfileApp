import { AuthService, IUserData } from 'src/app/Services/auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { Auth, Storage } from 'aws-amplify';
import { Injectable } from '@angular/core';
import DynamoDB, { GetItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError, S3 } from 'aws-sdk';
import { default as _config } from "../../config.json";

interface IProfile extends IUserData {
  id: string,
  isConfirmed: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private auth: AuthService) { }

  getAllUserProfiles(callback: (err: any, data: ScanOutput) => void) {
    const params = {
      TableName: 'Users'
    }

    this.auth.getCredentials((err, credentials) => {
      if (err) {
        callback(err, {})
      }

      else {
        const db = new DynamoDB({
          region: _config.region,
          credentials: credentials
        });

        db.scan(params, callback);
      }
    })
  }

  getProfile(id: string, callback: (err: AWSError, data: GetItemOutput) => void) {
    const params = {
      TableName: 'Users',
      Key: {
        id: {
          S: id
        }
      }
    };

    // Auth.currentCredentials()
    //   .then(credentials => {
    //     // console.log("credentials: ", credentials);

    //     const db = new DynamoDB({
    //       region: _config.region,
    //       credentials: Auth.essentialCredentials(credentials)
    //     });

    //     db.getItem(params, callback);
    //   })
    //   .catch(err => {
    //     // console.error("promise error", err);
    //   });
  }

  addProfile(profile: IProfile) {
    const url = `${_config.api.invokeUrl}/users`
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "content-Type": "application/json"
      }
    });
  }

  addProfileImage(userId: string, imageFile: File) {
    this.auth.getCredentials((err, creds) => {
      if (!err) {
        Storage.configure({
          region: _config.region,
          // userPoolId: _config.cognito.USER_POOL_ID,
          // userPoolWebClientId: _config.cognito.APP_CLIENT_ID,
          identityPoolId: _config.cognito.IDENTITY_POOL_ID,
          credentials: creds
        });

        console.log("requesting");
        
        Storage.put("bcd", imageFile, {
          bucket: _config.s3.imagesBucket,
          // ...creds
        })
          .then(res => {
            console.log("hiii", res);
          })
          .catch(err => {
            console.log("Error: ", err);
            
          });
      }
    });




  }
}

