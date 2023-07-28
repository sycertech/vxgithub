# vxgithub

> Better embeds for GitHub links on Discord (and Telegram!)

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
