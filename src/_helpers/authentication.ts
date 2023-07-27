import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
		return {
			message: messages.SUCCESS,
			refreshToken: response.user.refreshToken,
			idToken,
		};
	} catch (e: any) {
		return { message: e.message };
	}
}
