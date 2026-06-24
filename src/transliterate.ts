type GoogleInputToolsResponse = [string, [string, string[], ...unknown[]][]];

// Module-level cache: persists for the lifetime of the Raycast process
const wordCache = new Map<string, string>();

// Google's API caps around 20 words per request, so we batch in chunks
const BATCH_SIZE = 15;

async function fetchWord(word: string): Promise<string | null> {
  const encoded = encodeURIComponent(word);
  const url = `https://inputtools.google.com/request?text=${encoded}&itc=ml-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`transliterate: HTTP ${res.status}`);
    return null;
  }

  const data = (await res.json()) as GoogleInputToolsResponse;
  if (data[0] !== "SUCCESS") {
    console.error(`transliterate: non-SUCCESS: ${data[0]}`);
    return null;
  }

  return data[1]?.[0]?.[1]?.[0] ?? null;
}

export async function transliterate(input: string): Promise<string | null> {
  if (!input.trim()) return "";

  const words = input.trim().split(/\s+/);

  // Fetch all uncached words in parallel
  const uncached = words.filter((w) => !wordCache.has(w));

  await Promise.all(
    uncached.map(async (word) => {
      const result = await fetchWord(word);
      if (result !== null) {
        wordCache.set(word, result);
      }
    }),
  );

  const parts = words.map((w) => wordCache.get(w));
  if (parts.some((p) => p === undefined)) return null;

  return parts.join(" ");
}