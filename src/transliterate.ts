// Vowels (standalone)
const vowelMap: Record<string, string> = {
  a: "അ",
  aa: "ആ",
  i: "ഇ",
  ii: "ഈ",
  u: "ഉ",
  uu: "ഊ",
  e: "എ",
  ee: "ഏ",
  ai: "ഐ",
  o: "ഒ",
  oo: "ഓ",
  au: "ഔ",
  ri: "ഋ",
};

// Vowel signs (matras) — used after consonants
const matraMap: Record<string, string> = {
  a: "", // inherent vowel, no matra needed
  aa: "ാ",
  i: "ി",
  ii: "ീ",
  u: "ു",
  uu: "ൂ",
  e: "െ",
  ee: "േ",
  ai: "ൈ",
  o: "ൊ",
  oo: "ോ",
  au: "ൌ",
  ri: "ൃ",
};

// Consonants (always followed by inherent 'a')
const consonantMap: Record<string, string> = {
  k: "ക",
  kh: "ഖ",
  g: "ഗ",
  gh: "ഘ",
  ng: "ങ",
  ch: "ച",
  chh: "ഛ",
  j: "ജ",
  jh: "ഝ",
  nj: "ഞ",
  t: "ത",
  th: "ഥ",
  d: "ദ",
  dh: "ധ",
  n: "ന",
  tt: "ട",
  tth: "ഠ",
  dd: "ഡ",
  ddh: "ഢ",
  nn: "ണ",
  p: "പ",
  ph: "ഫ",
  b: "ബ",
  bh: "ഭ",
  m: "മ",
  y: "യ",
  r: "ര",
  l: "ല",
  v: "വ",
  w: "വ",
  sh: "ശ",
  ssh: "ഷ",
  s: "സ",
  h: "ഹ",
  ll: "ള",
  rr: "ർ",
  zh: "ഴ",
  lr: "ൽ",
  nm: "ൻ",
  nk: "ങ്ക",
};

const virama = "്";

export function transliterate(input: string): string {
  const text = input.toLowerCase();
  let result = "";
  let i = 0;

  while (i < text.length) {
    // Try to match consonant (longest match first)
    let consonant = "";
    let consonantLen = 0;

    for (const key of Object.keys(consonantMap).sort((a, b) => b.length - a.length)) {
      if (text.startsWith(key, i)) {
        consonant = consonantMap[key];
        consonantLen = key.length;
        break;
      }
    }

    if (consonant) {
      i += consonantLen;

      // Look ahead for a vowel following this consonant
      let matra = "";
      for (const key of Object.keys(matraMap).sort((a, b) => b.length - a.length)) {
        if (text.startsWith(key, i)) {
          matra = matraMap[key];
          i += key.length;
          break;
        }
      }

      // Check if next char is another consonant (needs virama)
      let nextIsConsonant = false;
      for (const key of Object.keys(consonantMap)) {
        if (text.startsWith(key, i)) {
          nextIsConsonant = true;
          break;
        }
      }

      if (matra === "" && nextIsConsonant) {
        // Consonant cluster: add virama
        result += consonant + virama;
      } else {
        result += consonant + matra;
      }
      continue;
    }

    // Try standalone vowel
    let matched = false;
    for (const key of Object.keys(vowelMap).sort((a, b) => b.length - a.length)) {
      if (text.startsWith(key, i)) {
        result += vowelMap[key];
        i += key.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Pass through spaces, punctuation, numbers
      result += text[i];
      i++;
    }
  }

  return result;
}
