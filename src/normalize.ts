export function toITRANS(input: string): string {
  let text = input.toLowerCase().trim();

  // Common casual Manglish → ITRANS word mappings
  const wordMap: Record<string, string> = {
    // Greetings & common words
    namaskaram: "namaskaaraM",
    namaskar: "namaskaar",
    vanakkam: "vaNakkam",
    njan: "njaM",
    njaan: "njaan",
    nee: "nii",
    avan: "avan",
    aval: "aval",
    avr: "avar",
    avar: "avar",
    nammude: "nammude",
    veedu: "viiDu",
    school: "skuul",
    kerala: "keerala",
    keralam: "keeralaM",
    malayalam: "malayaaLaM",
    amma: "ammaa",
    achan: "acchan",
    chechi: "chechi",
    chettan: "chettaN",
    poda: "poDA",
    podi: "poDi",
    mone: "mone",
    mol: "moL",
    nalla: "nalla",
    valla: "valla",
    illa: "illa",
    undo: "uNDo",
    und: "uND",
    pokum: "pokum",
    varum: "varum",
    parayam: "parayaM",
    paranju: "paranju",
    kando: "kaNDo",
    kandum: "kaNDum",
    venam: "veNaM",
    veno: "veNo",
    enthu: "enthu",
    enth: "enth",
    entha: "enthaa",
    enthanu: "enthaanu",
    evidey: "eviDe",
    evide: "eviDe",
    ingott: "ingott",
    ingane: "ingane",
    angane: "angane",
    pokatte: "pokaTTe",
    vaa: "vaa",
    va: "vaa",
    da: "daa",
    di: "dii",
    nanniyund: "nanniuND",
    nanni: "nanni",
    sheriyanu: "sheriyaanu",
    sheriya: "sheriya",
    theri: "theri",
    adipoli: "aDipoli",
    kidu: "kiDu",
    kollam: "kollaM",
    beautiful: "byuuTiful",
    happy: "haapi",
    love: "lav",
    iphone: "",
  };

  // Apply whole-word replacements first
  const words = text.split(/(\s+)/);
  const mapped = words.map((word) => wordMap[word] ?? word);
  text = mapped.join("");

  // Character-level casual → ITRANS conversions
  // These handle the remaining unmapped words

  // Long vowels: people rarely type aa, ii, uu — infer from context
  // Double vowels → long
  text = text.replace(/aa/g, "aa"); // already ITRANS
  text = text.replace(/ee/g, "ii"); // 'ee' casual → 'ii' ITRANS
  text = text.replace(/oo/g, "uu"); // 'oo' casual → 'uu' ITRANS

  // Retroflex inference: 'l' before vowels mid/end-word → 'L' (ള)
  // This is heuristic — works for most Malayalam words
  text = text.replace(/\bla/g, "la"); // word-start 'la' stays ല
  text = text.replace(/ala/g, "aLa"); // mid-word 'ala' → ള
  text = text.replace(/ula/g, "uLa");
  text = text.replace(/ela/g, "eLa");
  text = text.replace(/ila/g, "iLa");

  // 'tt' mid-word → retroflex TT (ട്ട)
  text = text.replace(/([aeiou])tt([aeiou])/g, "$1TT$2");

  // 'nd' → 'nD' (ണ്ട) common in Malayalam
  text = text.replace(/nd/g, "nD");

  // Final 'm' → anusvara M (ം)
  text = text.replace(/m(\s|$)/g, "M$1");

  // 'sh' stays as 'sh' (ശ) — already ITRANS
  // 'zh' → 'zh' — not standard ITRANS, map to L
  text = text.replace(/zh/g, "L");

  return text;
}
