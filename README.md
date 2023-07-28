<div align="center">
	<br>
	<p>
		<a href="https://github.com/carterhimmel/vxgithub"><img src="/.github/assets/pr_review.png" width="70%" alt="vxgithub demo" /></a>
	</p>
	<br>
	<h2 style="padding-top: 0%">vxgithub</h2>
	<h3>Better embeds for GitHub links on Discord (and Telegram!)</h3>
	<a href="https://github.com/sycertech/vxgithub/actions/workflows/ci.yml"><img alt="Test status" src="https://github.com/sycertech/vxgithub/actions/workflows/ci.yml/badge.svg"></a>
</div>

## Usage

1. Prepend `github.com` with `vx`

https://github.com -> https://vxgithub.com

2. replace `#`'s with `/`'s

For example:

```diff
- https://github.com/$org/$repo/issues/$issue_number#issuecomment-$comment_id
+ https://vxgithub.com/$org/$repo/issues/$issue_number/issuecomment-$comment_id
```

> [!NOTE]  
> The fragment isn't passed to the server, so you have to replace it with a `/` yourself.  
> See [RFC 3986 3.5: Fragment](https://datatracker.ietf.org/doc/html/rfc3986#section-3.5) for more information.  

## Roadmap

- [x] Issue Comment (`/$org/$repo/issues/$issue_number/issuecomment-$comment_id`)
- [x] PR Comment (`/$org/$repo/pull/$pr_number#issuecomment-$comment_id`)
- [x] PR Review Comment (`/$org/$repo/pull/$pr_number#discussion_r$comment_id`)
- [x] PR Review (`/$org/$repo/pull/$pr_number#pullrequestreview$comment_id`)
