export const emailRegex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const passwordRegex = /[^\w\d]*(([0-9]+.*[A-Z]+.*)|[A-Z]+.*([0-9]+.*))/;
export const SERVER_URL =
	process.env.NEXT_PUBLIC_NODE_ENV === 'development'
		? process.env.NEXT_PUBLIC_LOCAL_URL
		: process.env.NEXT_PUBLIC_URL;
