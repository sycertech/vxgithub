import router from './router.js';

export default {
	fetch: async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> =>
		router.handle(request, env, ctx),
};
