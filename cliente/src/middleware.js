'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";


export const middleware = async (request) => {

    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);
    const urlDashboard = new URL('/pages/dashboard', request.url);
    const isTokenValidated = await validateToken(token);

    if (!isTokenValidated || !token) {//verifica se o token não é válido ou não existe
        if (request.nextUrl.pathname === '/pages/dashboard') {
            return NextResponse.redirect(urlLogin);
        }
    }
    if(isTokenValidated){ //verifica se o token é valido
        if(request.nextUrl.pathname === '/'){//e ta na page de login, vai para dashboard
            return NextResponse.redirect(urlDashboard)
        }
    }
    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/alter') {
            return NextResponse.redirect(urlLogin);
        }
    }
    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/register') {
            return NextResponse.redirect(urlLogin);
        }
    }

    
    NextResponse.next();
};
export const config = {
    matcher: ['/', '/pages/dashboard', '/pages/alter', '/pages/register']
};