// import { getAuth } from 'firebase/auth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// import firebaseApp from '@/firebase/config';

// const auth = getAuth(firebaseApp);
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
	const sess = request.cookies.get('session')?.value;
	if (sess) {
		return NextResponse.redirect(new URL('/home', request.url));
	}
}

export const config = {
	matcher: '/',
};
