import { NextRequest, NextResponse } from "next/server"
import { getUser } from "./actions/AuthActions"


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const publicRoutes = ["/signin","signup","/"]
    console.log(request.nextUrl.pathname)
    if(!publicRoutes.includes(request.nextUrl.pathname)){

        const user = await getUser()
        if(!user.user){
            return NextResponse.redirect(new URL("/signin",request.url))
        }
    }
    // return NextResponse.redirect(new URL('/home', request.url))
  }

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)',
    ],
  }