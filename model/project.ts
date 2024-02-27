import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function getAllProjects() {
    const allProjects = await prisma.project.findMany()
    return(allProjects)
}

