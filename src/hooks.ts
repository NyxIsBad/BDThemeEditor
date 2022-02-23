import dotenv from 'dotenv';
dotenv.config();

import db from '$lib/db';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import type {Handle, GetSession} from '@sveltejs/kit';

const jwtSecret = process.env['JWT_SECRET'];

export const handle: Handle = async({event, resolve}) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const token: any = cookies.session && jwt.verify(cookies.session, (jwtSecret as string), (err, code) => {
		if (err) return false;
		return code;
	})

	if (token) {
		event.locals.auth = await db.user.findFirst({
			where: { id: token.id }
		});
	}

	return await resolve(event);
}

export const getSession: GetSession = ({locals}) => {
	return {
		auth: locals?.auth,
		flash: []
	}
}