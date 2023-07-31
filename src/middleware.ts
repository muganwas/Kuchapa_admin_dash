import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const sess = request.cookies.get('session')?.value;
	const host = request.headers.get('host');
	const uri = request.url?.split('//')[1].replace('/', ''); // Strip protocol and trailing slash from request.url
	if (!sess && uri !== host) {
		return NextResponse.redirect(new URL('/', request.url));
	}
	if (sess && uri === host) {
		return NextResponse.redirect(new URL('/home', request.url));
	}
}

export const config = {
	matcher: '/',
};
