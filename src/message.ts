import { stripIndents } from 'common-tags';

type CreateMessageOptions = {
	/**
	 * The name of the author of the content (e.g. "John Doe").
	 */
	authorName?: string;
	/**
	 * The URL of the author of the content (e.g. "https://example.com").
	 */
	authorUrl?: string;
	/**
	 * The hex color code for the embed.
	 */
	color?: string;
	/**
	 * The description field of the embed
	 */
	description: string;
	/**
	 * The HTML body of the message, to overwrite the default "you are being redirected" message.
	 */
	htmlBody?: string;
	/**
	 * The name of the provider of the content (e.g. "Example Provider").
	 */
	providerName?: string;
	/**
	 * The URL of the provider of the content (e.g. "https://example.com").
	 */
	providerUrl?: string;
	/**
	 * Whether to redirect the user to `url`.
	 *
	 * default: true
	 */
	redirect?: boolean;
	/**
	 * The URL of the image to display in the embed.
	 */
	thumbnailUrl?: string;
	/**
	 * The title of the embed
	 */
	title: string;
	/**
	 * The URL of the content (e.g. "https://example.com").
	 */
	url: string;
};

export function createMessage(
	env: Env,
	{
		authorName,
		authorUrl,
		color,
		description,
		htmlBody,
		providerName,
		providerUrl,
		redirect = true,
		thumbnailUrl,
		title,
		url,
	}: CreateMessageOptions,
) {
	const oembedQuery = new URLSearchParams();
	if (authorName) oembedQuery.append('author_name', authorName);
	if (authorUrl) oembedQuery.append('author_url', authorUrl);
	if (providerName) oembedQuery.append('provider_name', providerName);
	if (providerUrl) oembedQuery.append('provider_url', providerUrl);

	const body =
		htmlBody ??
		stripIndents`
		You are being redirected...
		<br>
		All else fails, <a href="${url}">click here</a>.
	`;

	return stripIndents`
		<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			${redirect ? `<meta http-equiv = "refresh" content = "0; url = ${url}" >` : ''}
			
			<title>${title}</title>
			${
				oembedQuery.size
					? `<link type="application/json+oembed" href="https://${env.DOMAIN}/api/oembed?${oembedQuery.toString()}">`
					: ''
			}

			<meta property="og:title" content="${title}" >
			<meta property="twitter:title" content="${title}" >

			<meta property="og:description" content="${description}" >
			<meta property="description" content="${description}" >
			<meta property="twitter:description" content="${description}" >

			<meta content="${url}" property="og:url" />
			${color ? `<meta name="theme-color" content="${color}" >` : ''}
			${thumbnailUrl ? `<meta name="og:image" content="${thumbnailUrl}" >` : ''}
			${thumbnailUrl ? `<meta name="twitter:image" content="${thumbnailUrl}" >` : ''}
		</head>
		<body>
			${body}
		</body>
		</html>
	`;
}

export const returnMessage = (message: string) =>
	new Response(message, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
			Expires: new Date(Date.now() + 60_000).toUTCString(),
		},
	});

export const return404 = (env: Env) =>
	returnMessage(
		createMessage(env, {
			title: `404: Not Found`,
			description: stripIndents`
		I couldn't find the page you were looking for.

		Did you remember to:
		- replace #'s with /'s (RFC3986 3.5: Fragment)

		For example:
		https://vxgithub.com/$org/$repo/issues:
		👎 /$issue_number#issuecomment-$comment_id$
		👍 /$issue_number/issuecomment-$comment_id
	`,
			url: env.ROOT_REDIRECT,
			providerName: 'Give us a ⭐️ on GitHub!',
			providerUrl: env.ROOT_REDIRECT,
			htmlBody: "wow, you're a crawler!",
			redirect: false,
		}),
	);

export function escapeHtml(text: string) {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	};
	// return text.replaceAll(/["&'<>]/g, (m) => { return map[m]; });
	return text.replaceAll(/["&'<>]/g, (rec) => map[rec]);
}
