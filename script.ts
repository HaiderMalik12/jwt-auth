/**
 * Fetch data from the course Table
 * Insert the data into Course Table
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    // write queries here
    // insert the record into course table

    // we need a course model
    // const course = await prisma.course.create({
    //     data: {
    //         title: 'LEARN GatsbyJs',
    //         desc: 'Step by Step learn how to use Gatsby',
    //         duration: 3.5
    //     }
    // })
    // console.log(course);


    const courses = await prisma.course.findMany();
    console.log(courses);

    // const video = await prisma.video.create({
    // data:{
    //  title: 'Learn relation',
    //  desc:'One to many relationship between models',
    //  url: 'www.aws.s3.com/2131231',
    //  courseId: 1
    // }}) 
    // console.log(video);
    
    const videos = await prisma.video.findMany({include:{Course:{}}});
    console.log(videos)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    // api/courses GET
    // api/course POST
    // api/course PUT
    // api/course/id GET
    // api/course/id DELETE
