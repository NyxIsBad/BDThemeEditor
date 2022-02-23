import db from '$lib/db';

import type {RequestHandler} from '@sveltejs/kit';
import type {Theme, Preset} from '@prisma/client';

export const get: RequestHandler = async({params, url}) => {
	const {slug} = params;
	const preset = url.searchParams.get('preset');

	try {
		const theme = !preset ? await db.theme.findFirst({
				where: {
					name: {
						equals: slug,
						mode: 'insensitive'
					}
				}
			}) : await db.preset.findFirst({
				where: {
					id: preset
				},
				include: {
					theme: true
				}
			});

		let selectedAddons: any;
		if ((typeof theme.id === 'number' && (theme as Theme).addons) || (typeof theme.id === 'string' && (theme as Preset & {theme: Theme}).theme.addons)) {
			let addons = await db.addon.findMany();

			const selector = typeof theme.id === 'number' ? (theme as Theme) : (theme as Preset & {theme: Theme}).theme;
			selectedAddons = addons.filter(addon => selector.addons.includes(addon.selector))
		}


		return {
			status: 200,
			body: {
				theme,
				addons: selectedAddons
			}
		}
	} catch (err) {
		return {
			status: 404
		}	
	}
}