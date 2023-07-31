import admin from '@/_firebase/admin_ini';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { idToken } = req.body;
		const tInDays = 2;
		const expiresIn = 60 * 60 * 24 * tInDays * 1000; // Two days
		try {
			const sessionCookie = await admin
				.auth()
				.createSessionCookie(idToken, { expiresIn });
			const options = {
				expires: tInDays,
				secure: true,
			};
			res
				.status(200)
				.json({ message: 'Cookie created', sessionCookie, options });
		} catch (e: any) {
			res.status(200).json({ message: 'Error', error: e.message });
		}
	} else {
		res.status(404).json({ message: '404' });
	}
}
