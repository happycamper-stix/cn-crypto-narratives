// Fetches a public X/Twitter post as JSON via the fxtwitter/vxtwitter mirror
// APIs (no X API key needed). Works for public posts only.

const URL_RE = /(?:twitter|x)\.com\/(\w{1,20})\/status\/(\d+)/;

export function extractXUrl(text) {
  const m = text.match(URL_RE);
  return m ? { user: m[1], id: m[2] } : null;
}

async function tryFetch(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "cn-crypto-narratives-bot" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchPost(text) {
  const ref = extractXUrl(text);
  if (!ref) return null;

  // fxtwitter first, vxtwitter as fallback — same response family.
  for (const base of [
    `https://api.fxtwitter.com/${ref.user}/status/${ref.id}`,
    `https://api.vxtwitter.com/${ref.user}/status/${ref.id}`,
  ]) {
    try {
      const data = await tryFetch(base);
      const t = data.tweet ?? data; // fxtwitter nests under .tweet; vxtwitter is flat
      if (!t || !(t.text ?? t.full_text)) continue;
      const author = t.author ?? {};
      return {
        text: t.text ?? t.full_text,
        author: {
          name: author.name ?? t.user_name ?? "",
          screenName: author.screen_name ?? t.user_screen_name ?? ref.user,
          followers: author.followers ?? t.user_followers_count ?? null,
        },
        stats: {
          likes: t.likes ?? t.favorite_count ?? null,
          retweets: t.retweets ?? t.retweet_count ?? null,
          replies: t.replies ?? t.reply_count ?? null,
          views: t.views ?? null,
        },
        date: t.created_at ?? t.date ?? null,
        url: `https://x.com/${ref.user}/status/${ref.id}`,
      };
    } catch {
      // try next mirror
    }
  }
  return { error: "Could not fetch that post (deleted, private, or mirrors down). Paste the post text instead." };
}
