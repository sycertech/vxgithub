/* eslint-disable sonarjs/no-identical-functions */
import type { Endpoints } from '@octokit/types';

export type FetchIssueCommentResult =
	Endpoints['GET /repos/{owner}/{repo}/issues/comments/{comment_id}']['response']['data'];

export async function fetchIssueComment(
	env: Env,
	owner: string,
	repo: string,
	commentId: string,
): Promise<FetchIssueCommentResult> {
	const url = `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'vxgithub (github.com/sycertech/vxgithub)',
		},
	});
	console.log(`GET ${res.url} ${res.status} ${res.statusText}`);

	return res.json();
}

export type FetchUserResult = Endpoints['GET /users/{username}']['response']['data'];

export async function fetchUser(env: Env, login: string): Promise<FetchUserResult> {
	const url = `https://api.github.com/users/${login}`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'vxgithub (github.com/sycertech/vxgithub)',
		},
	});
	console.log(`GET ${res.url} ${res.status} ${res.statusText}`);

	return res.json();
}

export type FetchIssueResult = Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data'];

export async function fetchIssue(env: Env, url: string): Promise<FetchIssueResult> {
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'vxgithub (github.com/sycertech/vxgithub)',
		},
	});
	console.log(`GET ${res.url} ${res.status} ${res.statusText}`);

	return res.json();
}

export type FetchPRComment = Endpoints['GET /repos/{owner}/{repo}/pulls/comments/{comment_id}']['response']['data'];

export async function fetchPRComment(
	env: Env,
	owner: string,
	repo: string,
	commentId: string,
): Promise<FetchPRComment> {
	const url = `https://api.github.com/repos/${owner}/${repo}/pulls/comments/${commentId}`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'vxgithub (github.com/sycertech/vxgithub)',
		},
	});
	console.log(`GET ${res.url} ${res.status} ${res.statusText}`);

	return res.json();
}

export type FetchPRResult = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response']['data'];

export async function fetchPR(env: Env, url: string): Promise<FetchPRResult> {
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'vxgithub (github.com/sycertech/vxgithub)',
		},
	});
	console.log(`GET ${res.url} ${res.status} ${res.statusText}`);

	return res.json();
}

// https://github.com/$owner/$repo/pull/$pull_number#pullrequestreview-$review_id
export type FetchPRReviewResult =
	Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}']['response']['data'];

export async function fetchPRReview(
	env: Env,
	owner: string,
	repo: string,
	pullNumber: string,
	reviewId: string,
): Promise<FetchPRReviewResult> {
	const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'vxgithub (github.com/sycertech/vxgithub)',
		},
	});
	console.log(`GET ${res.url} ${res.status} ${res.statusText}`);

	return res.json();
}
