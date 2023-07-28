import { json } from 'itty-router';
import type { VXRouter } from '../router.js';

export function register(router: VXRouter) {
	router.get('/api/oembed', (request) => {
		const author_name = request.query.author_name;
		const author_url = request.query.author_url;
		const provider_name = request.query.provider_name;
		const provider_url = request.query.provider_url;

		return json({
			success: true,
			version: '1.0',
			author_name,
			author_url,
			provider_name,
			provider_url,
		});
	});
}
