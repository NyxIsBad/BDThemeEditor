import dotenv from 'dotenv';
dotenv.config();

import type {RequestHandler} from '@sveltejs/kit';

const client_id = process.env['DISCORD_CLIENT_ID'];
const redirect_uri = process.env['DISCORD_REDIRECT_URI'];

export const get: RequestHandler = async() => {
	return {
		status: 302,
		headers: {
			location: `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=identify`
		}
	}
}