import { Auth } from 'aws-amplify';
import { Injectable } from '@angular/core';
import DynamoDB, { ScanOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';

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
        const db = new DynamoDB({
          region: "us-west-2",
          credentials: Auth.essentialCredentials(credentials)
        });

        db.scan(params, callback);
      })
      .catch(err => {
        console.error("promise error", err);
      });
  }
}
