import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv';


dotenv.config({path:'../.env'})

const bucket = process.env.AWS_BUCKET; // bucket name
const s3Client = new S3Client({ region: process.env.AWS_REGION, credentials:{accessKeyId: String(process.env.AWS_ACCESS), secretAccessKey: String(process.env.AWS_SECRET)} });

interface S3DTO {
    filename: string;
    data: string;
}

async function S3_UploadImage({filename, data}:S3DTO){
    const params = {
        Bucket: bucket,
        Key: 'imgs/'+ filename, 
        Body: data,
        ACL:'public-read',
    };
    
    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        
        console.log(results);
    } catch (err) {
        console.log(err.message);
    }
}


export { S3_UploadImage };
export { s3Client };