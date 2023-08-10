import { Injectable } from '@nestjs/common';
import { InfraProblemDTO } from './infraproblem.dto';
import { S3_UploadImage } from 'src/s3.handler';
import { prisma } from 'src/prisma.client';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class InfraService {
    async createProblem({problem, problemTitle, description, location, idRelator, type}:InfraProblemDTO){
        try {
            const problems = JSON.parse(String(problem));
            let problemPic = [''];
            problemPic.pop()
            
            await problems.map((item:any) => {
                S3_UploadImage({userId: idRelator, data: item.base64}).then((result) => problemPic.push(result));
            })

            await prisma.infraProblem.create({data:{
                problemPic,
                idRelator,
                location,
                problemTitle,
                type,
                description
            }})

            return 'Success'
        } catch (error) {
            return error
        }
    }

    async getAllProblems(){
        try {
            const problems = await prisma.infraProblem.findMany()
            console.log(problems)
            return problems
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getUserProblems(idRelator:string){
        try {
            const problems = await prisma.infraProblem.findMany({where: {idRelator}})
            console.log(problems)
            return problems
        } catch (error) {
            console.log(error)
            return error
        }
    }
}