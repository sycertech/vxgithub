import { stripIndents } from 'common-tags';
import { isCrawler } from '../constants.js';
import { createMessage, returnMessage } from '../message.js';
import type { VXRouter } from '../router.js';

export function register(router: VXRouter) {
	router.get('/', (request, env: Env) => {
		const crawler = isCrawler(request.headers.get('user-agent') ?? '');
		if (crawler) {
			return returnMessage(
				createMessage(env, {
					title: `How to use vxgithub.com`,
					description: stripIndents`
					1. github.com -> vxgithub.com
					2. replace #'s with /'s (RFC3986 3.5: Fragment)
	
					For example:
					- https://github.com/$org/$repo/issues/$issue_number#issuecomment-$comment_id
					- https://vxgithub.com/$org/$repo/issues/$issue_number/issuecomment-$comment_id
				`,
					url: env.ROOT_REDIRECT,
					providerName: 'Give us a ⭐️ on GitHub!',
					providerUrl: env.ROOT_REDIRECT,
					htmlBody: "wow, you're a crawler!",
					redirect: false,
				}),
			);
		}

		return Response.redirect(env.ROOT_REDIRECT, 301);
	});
}
