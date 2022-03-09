import type {RequestHandler} from '@sveltejs/kit';

import db from '$lib/db';

export const get: RequestHandler = async({request, locals}) => {
	const {themes} = await db.user.findFirst({
		where: {
			id: locals.auth.id
		},
		include: {
			themes: true
		}
	})

	return {
		body: {
			themes
		}
	}
}

export const del: RequestHandler = async({request, locals}) => {
	const body = await request.json();

	await db.theme.delete({
		where: {
			id: body.id
		}
	})

	return {
		status: 200,
		body: {
			message: 'Theme deleted'
		}
	}
}