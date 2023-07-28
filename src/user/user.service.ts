import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { prisma } from 'src/prisma.client';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { S3_UploadImage } from 'src/s3.handler';
dotenv.config({path:'../../.env'})


@Injectable()
export class UserService {

    async createUser({name, email, password}: UserDTO){

        const emailRE = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')

        try {
            if(!emailRE.test(email)){
                console.log(emailRE.test(email))
                console.log('oi')
                return 'Email invalid';
            }

            if(!name){
                return 'Name invalid';
            }

            const hashPassword = await bcrypt.hash(password, 12);
            const user = await prisma.user.create({data: {name, email, password:hashPassword}})
            
            return ({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            return error.message
        }
    }

    async login({email, password}:UserDTO) {

        try {
            const user = await prisma.user.findUnique({where:{
                email
            }})

            if(!user){
                return 'User not found';
            }

            const ok = await bcrypt.compare(password, user.password)

            if(!ok){
                return 'Password incorrect';
            }
            
            // const token = jwt.sign({id: user.id, name: user.name, email:user.email}, String(process.env.SECRET_KEY))
            
            // return token

        } catch (error) {
            return error.message;
        }
    }

    async findOne(email:string){
        try {
            const user = await prisma.user.findUnique({where:{email}});

            if(!user){
                return 'User not found';
            }

            return user;
        } catch (error) {
            return error.message;
        }
    }

    async subirImg({userId, data}: any){
        return S3_UploadImage({userId, data})
    }
        
}