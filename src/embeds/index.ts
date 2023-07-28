import { fetchIssue, fetchIssueComment, fetchPR, fetchUser } from '../github.js';
import { createMessage, escapeHtml, returnMessage } from '../message.js';

export * as pr from './pr_comments.js';

export enum IssueCommentParent {
	Issue,
	PullRequest,
}

/**
 * The function for:
 * - A PR Comment
 *   - https://github.com/$org/$repo/$pull/$pull_number#issuecomment-$id
 * - An Issue Comment
 *   - https://github.com/$org/$repo/issues/$issue_number#issuecomment-$id
 */
export async function comment(env: Env, type: IssueCommentParent, { id, org, repo }: Record<string, string>) {
	if (!id) return new Response('Not Found.', { status: 404 });
	const comment = await fetchIssueComment(env, org, repo, id);
	const user = await fetchUser(env, comment.user?.login ?? 'octocat');
	const content = (comment.body ?? 'No body.').slice(0, 2_000);
	const parent = await (type === IssueCommentParent.PullRequest ? fetchPR : fetchIssue)(env, comment.issue_url);

	return returnMessage(
		createMessage(env, {
			title: `New PR Comment`,
			description: escapeHtml(content),
			url: comment.html_url,
			authorName: user.name ? `${user.name} (@${user.login.toLowerCase()})` : `@${user.login.toLowerCase()}`,
			authorUrl: user.html_url,
			providerName: `${parent.title} (${org}/${repo}#${parent.number})`,
			providerUrl: parent.html_url,
			thumbnailUrl: user.avatar_url,
		}),
	);
}
