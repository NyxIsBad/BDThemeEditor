import type {Endpoint} from '$types/api';

import db from '$lib/db';

export const post: Endpoint = async({request, locals}) => {
	const body = await request.json();

	const req = await db.theme.create({
		data: {
			...body,
			userId: locals.auth.id,
		}
	});

	return {
		body: {
			data: {
				wow: 'amazing'
			}
		}
	}
}