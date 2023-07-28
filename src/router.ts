import type { IRequest } from 'itty-router';
import { Router, withParams } from 'itty-router';
import { isCrawler } from './constants.js';
import { return404 } from './message.js';
import { issueComment, oEmbed, prComments, root } from './routes/index.js';

type CF = [env: Env, ctx: ExecutionContext];
export type VXRouter = typeof router;

const router = Router<IRequest, CF>();
router.all('*', withParams, logRequest);

function logRequest(req: IRequest) {
	const url = new URL(req.url);
	const ua = req.headers.get('user-agent') ?? '';
	console.log(`${new Date().toISOString()} - [${url.pathname}] ${req.method} ${ua}`);
	const headers = JSON.stringify(Object.fromEntries(req.headers.entries()));
	console.log(headers);
}

issueComment.register(router);
oEmbed.register(router);
prComments.register(router);
root.register(router);

// 404 for everything else
router.all('*', (request, env) => {
	const crawler = isCrawler(request.headers.get('user-agent') ?? '');
	if (crawler) return return404(env);

	return Response.redirect(env.ROOT_REDIRECT, 301);
});

export default router;
