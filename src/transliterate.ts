import Sanscript from "@indic-transliteration/sanscript";
import { toITRANS } from "./normalize";

export function transliterate(input: string): string {
  if (!input.trim()) return "";
  try {
    const itrans = toITRANS(input);
    return Sanscript.t(itrans, "itrans", "malayalam");
  } catch {
    return "";
  }
}
