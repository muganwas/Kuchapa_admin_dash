import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { emailRegex, passwordRegex } from './utils';
import messages from './messages.json';
import { app } from '@/_firebase/config';

const auth = getAuth(app);

export async function authenticate(email: string, password: string) {
	if (!email.match(emailRegex)) {
		return { message: messages.NOT_EMIAL };
	} else if (!password.match(passwordRegex)) {
		return { message: messages.WRONG_PASS_FORMAT };
	}
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		const idToken = await response.user.getIdToken();
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf8',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({ idToken: idToken }),
		};
		const sessionResponse = await fetch('/api/auth', params);
		if (!sessionResponse.ok) {
			return { message: sessionResponse.statusText };
		}
		const conResponse = await sessionResponse.json();
		return {
			message: messages.SUCCESS,
			session: conResponse,
			refreshToken: response.user.refreshToken,
			idToken,
		};
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function logout() {
	try {
		const signoutInfo = signOut(auth);
		return { message: messages.SUCCESS, info: signoutInfo };
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}
