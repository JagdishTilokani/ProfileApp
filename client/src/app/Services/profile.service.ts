import { AuthService, IUserData } from 'src/app/Services/auth.service';
import { Injectable } from '@angular/core';
import { DynamoDB, S3 } from 'aws-sdk';
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

    async getProfile(id: string) {
        const creds = await this.auth.getCredentials();
        const params = {
            TableName: _config.dynamodb.profilesTable,
            Key: {
                id: {
                    S: id
                }
            }
        };

        const db = new DynamoDB({
            region: _config.region,
            credentials: creds
        });

        return db.getItem(params).promise();
    }

    async getProfileImage(userId: string) {
        const creds = await this.auth.getCredentials();
        const s3 = new S3({
            region: _config.region,
            credentials: creds
        });

        const params = {
            Bucket: _config.s3.imagesBucket,
            Key: userId + ".jpeg",
        };

        return s3.getObject(params).promise();
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
    }

    async updateProfile(user: any) {
        const idToken = await this.auth.getIdToken();
        const url = `${_config.api.invokeUrl}/users/${user.id}`;
        return fetch(url, {
            method: "PUT",
            headers: {
                Authorization: idToken
            },
            body: JSON.stringify(user),
        });
    }
}

