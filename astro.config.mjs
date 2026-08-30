// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://jurecki-portfolio.vercel.app',
	redirects: {
		'/projects/vibecoding/dataforge': '/projects/vibecoding/deepfries',
	},
});
