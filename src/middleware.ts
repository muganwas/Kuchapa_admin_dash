import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const sess = request.cookies.get('session')?.value;
	if (sess) {
		return NextResponse.redirect(new URL('/home', request.url));
	}
}

export const config = {
	matcher: '/',
};
