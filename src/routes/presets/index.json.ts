import db from '$lib/db';

import type {RequestHandler} from '@sveltejs/kit';

export const post: RequestHandler = async({request}) => {

	return {
		body: request.body
	}

	try {
		// await db.preset.create({
		// 	data: {
				
		// 	}
		// })
	} catch (err) {
		
	}

	return {
		status: 200,
		body: {}
	}
}