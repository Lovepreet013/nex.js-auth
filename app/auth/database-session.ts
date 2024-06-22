//file for encrypting and decrypting the session in database, can use it but now we are using stateless sessions

import 'server-only'
import {SignJWT, jwtVerify} from "jose" //for signing and verifying the JWT
import { cookies } from 'next/headers'
import type { SessionPayload } from './defination'
import { prisma } from '@/util/db'

const secretkey = process.env.SECRET
const key = new TextEncoder().encode(secretkey)

export async function encrypt(payload : SessionPayload){
    return new SignJWT(payload)
        .setProtectedHeader({alg : 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1hr')
        .sign(key)
}

export async function decrypt(session : string | undefined = ''){
    try{
        const {payload} = await jwtVerify(session, key, {
            algorithms : ['HS256'],
        })
        return payload
    }
    catch(error){
        console.log('Failed to verify session')
        return(error)
    }
}

export async function createSession(id : number){
    const  expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //ensures that the session and its associated cookie will expire exactly one week from the current time

    //Create a session in database
    const data = await prisma.session.create({
        data : {
            userId : id,
            expiresAt
        },
        select : {
            id : true
        }
    })

    const sessionId = data.id

    //Encrypting the session id
    const session = await encrypt({userId : id, expiresAt })

    //Store the session in cookies for optimistic auth checks
    cookies().set('session', session, {
        httpOnly : true,
        secure : true,
        expires : expiresAt,
        sameSite : 'lax',
        path : '/'
    })
}