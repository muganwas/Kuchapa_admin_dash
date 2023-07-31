'use client';

import { ReactEventHandler, useState } from 'react';

import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { authenticate } from '@/_helpers/authentication';
import messages from '@/_helpers/messages.json';
import TextInput from './components/TextInput';
import Button from './components/Button';
import Feedback from './components/Feedback';

import { feedback } from '@/_types';

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginFeedback, setLoginFeedback] = useState<feedback>({
		message: '',
		type: undefined,
	});
	const router = useRouter();

	const onLogin: ReactEventHandler = async (e) => {
		e.preventDefault;
		const response = await authenticate(username, password);
		if (response.message.includes('a success')) {
			response.refreshToken &&
				cookies.set('refreshToken', response.refreshToken);
			response.idToken && cookies.set('idToken', response.idToken);
			response.session &&
				cookies.set(
					'session',
					response.session.sessionCookie,
					response.session.options
				);
			router.push('/home');
			return setLoginFeedback({ message: '', type: undefined });
		}
		if (!response?.message.includes('Firebase')) {
			return setLoginFeedback({ message: response?.message, type: 'error' });
		}
		if (response?.message.includes('user-not-found')) {
			return setLoginFeedback({
				message: messages.USER_NOT_FOUND,
				type: 'error',
			});
		}
		if (response?.message.includes('wrong-password')) {
			return setLoginFeedback({ message: messages.WRONG_PASS, type: 'error' });
		}
		if (!response?.message.includes('user-not-found')) {
			return setLoginFeedback({ message: messages.FAILURE, type: 'error' });
		}
	};

	const updateUsername: ReactEventHandler = (e) => {
		e.preventDefault;
		setUsername((e.target as HTMLInputElement).value);
	};

	const updatePassword: ReactEventHandler = (e) => {
		e.preventDefault;
		setPassword((e.target as HTMLInputElement).value);
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='flex flex-col w-6/12'>
				<span>Login</span>
				<form
					id='login-form'
					onSubmit={onLogin}
					className='flex flex-col p-2 border-solid border border-grey-900'
				>
					{loginFeedback.message && (
						<Feedback
							message={loginFeedback.message}
							type={loginFeedback.type}
						/>
					)}
					<TextInput
						id='username'
						labelText='Username'
						value={username}
						onChange={updateUsername}
					/>
					<TextInput
						id='password'
						type='password'
						labelText='Password'
						value={password}
						onChange={updatePassword}
					/>
					<Button id='login-button' labelText='Submit' onClick={onLogin} />
				</form>
			</div>
		</main>
	);
}
