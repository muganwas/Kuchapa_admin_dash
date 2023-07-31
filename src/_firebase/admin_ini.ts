'use server';

import admin from 'firebase-admin';
import { getApp } from 'firebase-admin/app';
import { vars as serviceAccount } from '@/_firebase/adminsdk';
const jsonServiceAcount = JSON.parse(JSON.stringify(serviceAccount));

try {
	getApp();
} catch (e) {
	admin.initializeApp(
		{
			credential: admin.credential.cert(jsonServiceAcount),
			databaseURL: process.env.DATABASE_URL,
		},
		'server'
	);
}

export default admin;
