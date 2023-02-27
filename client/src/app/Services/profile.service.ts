import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { Injectable } from '@angular/core';
import DynamoDB, { GetItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';
import { default as _config } from "../../config.json";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  getAllUserProfiles(callback: (err: AWSError, data: ScanOutput) => void) {
    const params = {
      TableName: 'Users'
    }

    Auth.currentCredentials()
      .then(credentials => {
        // console.log("credentials: ", credentials);
    
        const db = new DynamoDB({
          region: _config.region,
          credentials: Auth.essentialCredentials(credentials)
        });

        db.scan(params, callback);
      })
      .catch(err => {
        // console.error("promise error", err);
      });
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

    Auth.currentCredentials()
      .then(credentials => {
        // console.log("credentials: ", credentials);
    
        const db = new DynamoDB({
          region: _config.region,
          credentials: Auth.essentialCredentials(credentials)
        });

        db.getItem(params, callback);
      })
      .catch(err => {
        // console.error("promise error", err);
      });
  }
}

