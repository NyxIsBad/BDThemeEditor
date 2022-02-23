import dotenv from 'dotenv';
dotenv.config();

import cookie from 'cookie';

import type {RequestHandler} from '@sveltejs/kit';

export const get: RequestHandler = async() => {
	return {
		status: 302,
		headers: {
			'set-cookie': cookie.serialize('session', '', {
				path: '/',
				expires: new Date(0)
			}),
			location: '/'
		}
	}
}