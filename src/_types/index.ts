import { ReactEventHandler } from 'react';

export interface feedback {
	message: string;
	type: 'error' | 'success' | undefined;
}

export interface textInput {
	id: string;
	type?: 'text' | 'number' | 'password';
	value?: string | number;
	placeholder?: string | undefined;
	className?: string;
	labelText?: string;
	onChange: ReactEventHandler;
}

export interface buttonInput {
	id: string;
	className?: string;
	labelText?: string;
	onClick: ReactEventHandler;
}
