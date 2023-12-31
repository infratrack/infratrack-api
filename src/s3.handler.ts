import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { writeFileSync, readFileSync, unlinkSync } from "fs";

import * as dotenv from 'dotenv';
dotenv.config({path:'../.env'})


// Configuring S3 client
const bucket = process.env.AWS_BUCKET; // bucket name
const s3Client = new S3Client({ region: process.env.AWS_REGION, credentials:{accessKeyId: String(process.env.AWS_ACCESS), secretAccessKey: String(process.env.AWS_SECRET)} });

interface S3DTO {
    userId: string;
    data: string;
}

export async function S3_UploadImage({userId, data}:S3DTO){
    let image = null;
    var now = String(Date.now());

    if(!(userId&&data)){
        return new Error();
    }

    const tempFile = userId + now + '.jpg';

    // --------------- Decoding file and saving to temp image -------------------------------------------------
    try {
        const buffer = Buffer.from(data, 'base64');  // decoding base 64 to image 
        writeFileSync(tempFile, buffer);           // creating temporary file for the image decoded
        image = readFileSync(tempFile);      // reading image to send to S3 bucket
        
    } catch (error) {
        return error
    }

    const fileName = userId + '/' + tempFile; // Defining file path. Example: 1234-5678(folder)/1234-5678timestamp.jpg
    console.log('Uploading image: ' + fileName);
    
    // --------------- Submitting temp image to S3 -------------------------------------------------
    try {
        const params = {                        // params to S3
            Bucket: bucket,
            Key: 'imgs/'+ fileName, 
            Body: image,
            ACL:'public-read',
        };

        s3Client.send(new PutObjectCommand(params)).then(() => console.log('Success sending: ' + tempFile));
        
        unlinkSync(tempFile);
        
        return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/imgs/` + fileName
        
    } catch (err) {
        unlinkSync(tempFile);
        return err
    }

    // const upload = new Upload({
    //     client: s3Client,
    //     params: {
    //       Bucket: bucket,
    //       Key: 'imgs/'+ filename,
    //       Body: image,
    //       ACL: 'public-read'
    //     }
    // });

    // upload.

}