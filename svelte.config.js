import adapter from '@sveltejs/adapter-auto';
import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import slug from 'rehype-slug';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess({
			postcss: {
				plugins: [autoprefixer()]
			}
		}),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [slug]
		})
	],
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'$components': path.resolve('./src/components/'),
					'$styles': path.resolve('./src/styles/')
				}
			}
		}
	}
};

export default config;
