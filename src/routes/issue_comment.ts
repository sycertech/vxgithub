import type { IRequestStrict } from 'itty-router';
import { IssueCommentParent, comment } from '../embeds/index.js';
import { return404 } from '../message.js';
import type { VXRouter } from '../router.js';

// https://github.com/$owner/$repo/issues/$issue_number#issuecomment-$comment_id
export function register(router: VXRouter) {
	router.get<
		IRequestStrict & {
			hash: string;
			org: string;
			repo: string;
		}
	>('/:org/:repo/issues/:issue/:hash', async ({ org, repo, hash }, env: Env) => {
		const id = /issuecomment-(?<id>\d+)/.exec(hash)?.[1];
		if (id) return comment(env, IssueCommentParent.Issue, { id, org, repo });

		return return404(env);
	});
}
