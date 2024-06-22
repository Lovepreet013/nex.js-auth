import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/auth/stateless-session";
import {cookies} from 'next/headers'

//1.Specifying protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup']

export default async function middleware(req : NextRequest){
    //2. Check if the route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    //3 Decrypt the session on cookie
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    //4. Redirect
    if(isProtectedRoute && !session?.userId){
        return NextResponse.redirect(new URL('/login', req.nextUrl)) //redirecting to /login : URL(redirecting url, currentUrl)
    }

    if(
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ){
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl)) //redirecting to /dashboard
    }

    return NextResponse.next();
}