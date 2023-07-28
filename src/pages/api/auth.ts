import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

import { vars as serviceAccount } from '../../_firebase/adminsdk';
const jsonServiceAcount = JSON.parse(JSON.stringify(serviceAccount));

admin.initializeApp(
	{
		credential: admin.credential.cert(jsonServiceAcount),
		databaseURL: process.env.DATABASE_URL,
	},
	'server'
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { idToken } = req.body;
		const expiresIn = 60 * 60 * 24 * 2 * 1000; // Two days
		admin
			.auth()
			.createSessionCookie(idToken, { expiresIn })
			.then(
				(sessionCookie) => {
					// Set cookie policy for session cookie.
					const options = { maxAge: expiresIn, httpOnly: true, secure: true };
					res
						.status(200)
						.json({ message: 'Cookie created', sessionCookie, options });
				},
				(error) => {
					res.status(200).json({ message: 'Error', error });
				}
			);
		return;
	}
	res.status(404).json({ message: '404' });
}
