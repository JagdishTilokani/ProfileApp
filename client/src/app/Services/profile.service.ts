import { AuthService, IUserData } from 'src/app/Services/auth.service';
import { Injectable } from '@angular/core';
import DynamoDB, { GetItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { S3 } from 'aws-sdk';
import { PutObjectOutput } from 'aws-sdk/clients/s3';
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

    async getAllUserProfiles() {
        const params = {
            TableName: _config.dynamodb.profilesTable
        }

        const creds = await this.auth.getCredentials();
        const db = new DynamoDB({
            region: _config.region,
            credentials: creds
        });

        return db.scan(params).promise();
    }

    // getAllUserProfiles(callback: (err: any, data: ScanOutput) => void) {
    //     const params = {
    //         TableName: 'Users'
    //     }

    //     this.auth.getCredentials((err, credentials) => {
    //         if (err) {
    //             callback(err, {})
    //         }

    //         else {
    //             const db = new DynamoDB({
    //                 region: _config.region,
    //                 credentials: credentials
    //             });

    //             db.scan(params, callback);
    //         }
    //     })
    // }

    async getProfile(id: string) {
        const params = {
            TableName: _config.dynamodb.profilesTable,
            Key: {
                id: {
                    S: id
                }
            }
        };

        const creds = await this.auth.getCredentials();
        const db = new DynamoDB({
            region: _config.region,
            credentials: creds
        });

        return db.getItem(params).promise();
    }

    // getProfile(id: string, callback: (err: any, data: GetItemOutput) => void) {
    //     const params = {
    //         TableName: 'Users',
    //         Key: {
    //             id: {
    //                 S: id
    //             }
    //         }
    //     };

    //     this.auth.getCredentials((err, credentials) => {

    //         if (err) {
    //             callback(err, {})
    //         }

    //         else {
    //             const db = new DynamoDB({
    //                 region: _config.region,
    //                 credentials: credentials
    //             });

    //             db.getItem(params, callback);
    //         }
    //     })
    // }

    // Add profile using API Gateway Call

    // addProfile(profile: IProfile) {
    //     const url = `${_config.api.invokeUrl}/users`
    //     return fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify(profile),
    //         headers: {
    //             "content-Type": "application/json"
    //         }
    //     });
    // }

    async getProfileImage(userId: string) {
        const creds = await this.auth.getCredentials();
        const s3 = new S3({
            region: _config.region,
            credentials: creds
        });

        const params = {
            Bucket: _config.s3.imagesBucket,
            Key: userId + ".jpeg",
            Expires: 60,
            // ResponseContentType: "application/octet-stream"
            // ResponseContentType: "multipart/form-data"
        };

        // return s3.getObject(params).promise();
        return s3.getSignedUrlPromise('getObject', params)
        // return s3.upload(params).promise();
    }

    async addProfileImage(userId: string, imageFile: File) {
        const creds = await this.auth.getCredentials();
        const s3 = new S3({
            region: _config.region,
            credentials: creds
        });

        const params = {
            Bucket: _config.s3.imagesBucket,
            Key: userId + ".jpeg",
            Body: imageFile,
            ContentType: "multipart/form-data",
        };

        return s3.putObject(params).promise();
        // return s3.upload(params).promise();
    }

    // addProfileImage(userId: string, imageFile: File, callback: (err: any, data: PutObjectOutput) => void) {
    //     this.auth.getCredentials((err, creds) => {
    //         if (err) {
    //             callback(err, {});
    //         }

    //         else {
    //             const s3 = new S3({
    //                 region: _config.region,
    //                 credentials: creds
    //             });

    //             const params = {
    //                 Bucket: _config.s3.imagesBucket,
    //                 Key: userId,
    //                 Body: imageFile,
    //                 ContentType: "multipart/form-data",
    //             };

    //             s3.putObject(params, callback);

    //             s3.upload(params, callback);
    //         }
    //     });
    // }
}

