import type { IRequestStrict } from 'itty-router';
import { IssueCommentParent, comment, pr } from '../embeds/index.js';
import { return404 } from '../message.js';
import type { VXRouter } from '../router.js';

export function register(router: VXRouter) {
	// https://github.com/$owner/$repo/pull/$pull_number#discussion_r$review_id
	// https://github.com/$owner/$repo/pull/$pull_number#issuecomment-$comment_id
	// https://github.com/$owner/$repo/pull/$pull_number#pullrequestreview-$review_id
	router.get<
		IRequestStrict & {
			hash: string;
			org: string;
			prNumber: string;
			repo: string;
		}
	>('/:org/:repo/pull/:prNumber/:hash', async ({ org, repo, prNumber, hash }, env: Env) => {
		const hashMappings = [
			{
				regex: /discussion_r(?<id>\d+)/,
				handler: pr.discussion,
			},
			{
				regex: /pullrequestreview-(?<id>\d+)/,
				handler: pr.pullRequestReview,
			},
		];

		for (const mapping of hashMappings) {
			const matched = mapping.regex.exec(hash)?.[1];
			if (matched) return mapping.handler(env, { id: matched, org, repo, prNumber, hash });
		}

		// handle generic `comment`
		const id = /issuecomment-(?<id>\d+)/.exec(hash)?.[1];
		if (id) {
			return comment(env, IssueCommentParent.PullRequest, { id, org, repo, prNumber, hash });
		}

		return return404(env);
	});
}
