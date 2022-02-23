import db from '$lib/db';

import type {RequestHandler} from '@sveltejs/kit';

export const get: RequestHandler = async() => {
	const themes = await db.theme.findMany({
		include: {
			user: true
		}
	});

	return {
		status: 200,
		body: themes
	}
}