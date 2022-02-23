import dotenv from 'dotenv';
dotenv.config();

import db from '$lib/db';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import type {RequestHandler} from '@sveltejs/kit';

const client_id = process.env['DISCORD_CLIENT_ID'];
const client_secret = process.env['DISCORD_CLIENT_SECRET'];
const redirect_uri = process.env['DISCORD_REDIRECT_URI'];
const jwtSecret = process.env['JWT_SECRET'];

export const get: RequestHandler = async({url}) => {
	const code = url.searchParams.get('code');

	const tokenReq = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
      scope: 'identify'
    }).toString()
  });
	const {access_token} = await tokenReq.json();

	const userReq = await fetch('https://discord.com/api/v6/users/@me', {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  const discordUser = await userReq.json();

	let user = await db.user.findFirst({
		where: {
			discordId: discordUser.id
		}
	})

  const defaults = {
    avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
    name: `${discordUser.username}#${discordUser.discriminator}`
  }

  if (user) {
		try {
			await db.user.update({
				where: {
					discordId: discordUser.id
				},
				data: defaults
			})
		} catch (error) {
			console.error(error);
			return {
				status: 500
			}
		}
	} else {
		try {
			user = await db.user.create({
				data: {
					discordId: discordUser.id,
					...defaults
				}
			});
		} catch (error) {
			console.error(error);
			return {
				status: 500
			}
		}
	}

	const token = jwt.sign({id: user.id}, jwtSecret, {
		expiresIn: '7d'
	});

	return {
		status: 308,
		headers: {
			location: '/',
			'set-cookie': cookie.serialize('session', token, {
				httpOnly: process.env.NODE_ENV !== 'development',
				secure: process.env.NODE_ENV !== 'development',
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'lax',
				path: '/'
			})
		}
	}
}