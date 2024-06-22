import 'server-only'
import { cache } from 'react'
import { verifySession } from './stateless-session'
import { prisma } from '@/util/db';

export const getUser = cache(async () => {
    const session = await verifySession();
    if(!session) return null

    try{
        const data = await prisma.user.findUnique({
            where : {
                id : session.userId
            },
            select: {
                id : true,
                name : true,
                email : true
            }
        })

        return data
    }catch(error){
        console.log('Failed to fetch user')
        return null
    }
})