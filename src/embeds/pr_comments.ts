import { fetchPR, fetchPRComment, fetchPRReview, fetchUser } from '../github.js';
import { createMessage, escapeHtml, returnMessage } from '../message.js';

/**
 * The function for a PR discussion comment.
 * https://github.com/$owner/$repo/pull/$pull_number#discussion_r$review_id
 */
export async function discussion(env: Env, { id, org, repo, prNumber, hash }: Record<string, string>) {
	console.log({ org, repo, prNumber, hash });
	if (!id) return new Response('Not Found.', { status: 404 });
	const comment = await fetchPRComment(env, org, repo, id);
	const user = await fetchUser(env, comment.user?.login ?? 'octocat');
	const content = (comment.body ?? 'No body.').slice(0, 2_000);
	const pull = await fetchPR(env, comment.pull_request_url);

	return returnMessage(
		createMessage(env, {
			title: `New PR Comment`,
			description: escapeHtml(content),
			url: comment.html_url,
			authorName: user.name ? `${user.name} (@${user.login.toLowerCase()})` : `@${user.login.toLowerCase()}`,
			authorUrl: user.html_url,
			providerName: `${pull.title} (${org}/${repo}#${pull.number})`,
			providerUrl: pull.html_url,
			thumbnailUrl: user.avatar_url,
		}),
	);
}

/**
 * The function for a PR review comment.
 * https://github.com/$owner/$repo/pull/$pull_number#pullrequestreview-$review_id
 */
export async function pullRequestReview(env: Env, { id, org, repo, prNumber }: Record<string, string>) {
	if (!id) return new Response('Not Found.', { status: 404 });
	const review = await fetchPRReview(env, org, repo, prNumber, id);
	const user = await fetchUser(env, review.user?.login ?? 'octocat');
	const content = (review.body ?? 'No body.').slice(0, 2_000);
	const pull = await fetchPR(env, review.pull_request_url);

	return returnMessage(
		createMessage(env, {
			title: `New PR Review (${review.state.toLowerCase()})`,
			description: escapeHtml(content),
			url: review.html_url,
			authorName: user.name ? `${user.name} (@${user.login.toLowerCase()})` : `@${user.login.toLowerCase()}`,
			authorUrl: user.html_url,
			providerName: `${pull.title} (${org}/${repo}#${pull.number})`,
			providerUrl: pull.html_url,
			thumbnailUrl: user.avatar_url,
		}),
	);
}
