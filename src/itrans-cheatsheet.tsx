import { List, ActionPanel, Action, Clipboard, showHUD } from "@raycast/api";

type CheatsheetItem = {
  itrans: string;
  malayalam: string;
  example: string;
  exampleMeaning: string;
};

const vowels: CheatsheetItem[] = [
  { itrans: "a",  malayalam: "അ", example: "avan",    exampleMeaning: "he" },
  { itrans: "aa", malayalam: "ആ", example: "aa",      exampleMeaning: "that (fem)" },
  { itrans: "i",  malayalam: "ഇ", example: "ith",     exampleMeaning: "this" },
  { itrans: "ii", malayalam: "ഈ", example: "iisa",    exampleMeaning: "god" },
  { itrans: "u",  malayalam: "ഉ", example: "uru",     exampleMeaning: "form" },
  { itrans: "uu", malayalam: "ഊ", example: "uuru",    exampleMeaning: "town" },
  { itrans: "e",  malayalam: "എ", example: "ent",     exampleMeaning: "what" },
  { itrans: "ee", malayalam: "ഏ", example: "eeka",    exampleMeaning: "leaf" },
  { itrans: "ai", malayalam: "ഐ", example: "aishvaryam", exampleMeaning: "wealth" },
  { itrans: "o",  malayalam: "ഒ", example: "oru",     exampleMeaning: "one/a" },
  { itrans: "oo", malayalam: "ഓ", example: "oonam",   exampleMeaning: "Onam" },
  { itrans: "au", malayalam: "ഔ", example: "aushadham", exampleMeaning: "medicine" },
];

const consonants: CheatsheetItem[] = [
  { itrans: "k",   malayalam: "ക", example: "kaalam",  exampleMeaning: "time" },
  { itrans: "kh",  malayalam: "ഖ", example: "khagam",  exampleMeaning: "bird" },
  { itrans: "g",   malayalam: "ഗ", example: "ganam",   exampleMeaning: "song" },
  { itrans: "gh",  malayalam: "ഘ", example: "ghaDiyaar", exampleMeaning: "clock" },
  { itrans: "ng",  malayalam: "ങ", example: "ngaa",    exampleMeaning: "(nasal)" },
  { itrans: "ch",  malayalam: "ച", example: "chiri",   exampleMeaning: "smile" },
  { itrans: "Ch",  malayalam: "ഛ", example: "Chatra",  exampleMeaning: "umbrella" },
  { itrans: "j",   malayalam: "ജ", example: "jalam",   exampleMeaning: "water" },
  { itrans: "jh",  malayalam: "ഝ", example: "jhaDi",   exampleMeaning: "bush" },
  { itrans: "~n",  malayalam: "ഞ", example: "~naan",   exampleMeaning: "I" },
  { itrans: "T",   malayalam: "ട", example: "TVi",     exampleMeaning: "TV" },
  { itrans: "Th",  malayalam: "ഠ", example: "Thakam",  exampleMeaning: "fatigue" },
  { itrans: "D",   malayalam: "ഡ", example: "Doctor",  exampleMeaning: "doctor" },
  { itrans: "Dh",  malayalam: "ഢ", example: "Dhol",    exampleMeaning: "drum" },
  { itrans: "N",   malayalam: "ണ", example: "kaNam",   exampleMeaning: "moment" },
  { itrans: "t",   malayalam: "ത", example: "thaazha", exampleMeaning: "low" },
  { itrans: "th",  malayalam: "ഥ", example: "thamburu", exampleMeaning: "veena" },
  { itrans: "d",   malayalam: "ദ", example: "daivam",  exampleMeaning: "god" },
  { itrans: "dh",  malayalam: "ധ", example: "dhairyam", exampleMeaning: "courage" },
  { itrans: "n",   malayalam: "ന", example: "naadu",   exampleMeaning: "land/country" },
  { itrans: "p",   malayalam: "പ", example: "paadal",  exampleMeaning: "song" },
  { itrans: "ph",  malayalam: "ഫ", example: "phalam",  exampleMeaning: "fruit" },
  { itrans: "b",   malayalam: "ബ", example: "balam",   exampleMeaning: "strength" },
  { itrans: "bh",  malayalam: "ഭ", example: "bhaavam", exampleMeaning: "emotion" },
  { itrans: "m",   malayalam: "മ", example: "manam",   exampleMeaning: "mind/smell" },
  { itrans: "y",   malayalam: "യ", example: "yaathra", exampleMeaning: "journey" },
  { itrans: "r",   malayalam: "ര", example: "raatri",  exampleMeaning: "night" },
  { itrans: "l",   malayalam: "ല", example: "loka",    exampleMeaning: "world" },
  { itrans: "L",   malayalam: "ള", example: "kaLam",   exampleMeaning: "field" },
  { itrans: "v",   malayalam: "വ", example: "vanam",   exampleMeaning: "forest" },
  { itrans: "sh",  malayalam: "ശ", example: "shaanti", exampleMeaning: "peace" },
  { itrans: "Sh",  malayalam: "ഷ", example: "Shadjam", exampleMeaning: "musical note" },
  { itrans: "s",   malayalam: "സ", example: "saayam",  exampleMeaning: "evening" },
  { itrans: "h",   malayalam: "ഹ", example: "hridayam", exampleMeaning: "heart" },
  { itrans: "zh",  malayalam: "ഴ", example: "mazha",   exampleMeaning: "rain" },
  { itrans: "rr",  malayalam: "ർ", example: "karr",    exampleMeaning: "bitter" },
  { itrans: "ll",  malayalam: "ൾ", example: "ellaa",   exampleMeaning: "all" },
];

const special: CheatsheetItem[] = [
  { itrans: "M",  malayalam: "ം", example: "keralaM",    exampleMeaning: "Kerala (with anusvara)" },
  { itrans: "H",  malayalam: "ഃ", example: "duHkham",    exampleMeaning: "sorrow" },
  { itrans: ".n", malayalam: "ം", example: "sa.ngeetham", exampleMeaning: "music" },
];

const tips = [
  "Uppercase letters matter! 'k' = ക but 'K' is different",
  "Double consonants make geminates: 'mm' = മ്മ, 'kk' = ക്ക",
  "'~n' = ഞ  (the 'nj' sound in 'njan')",
  "Capital 'M' at end of word = ം  (anusvara, nasal ending)",
  "Capital 'N' = ണ (retroflex n), lowercase 'n' = ന (dental n)",
  "Capital 'T' = ട (retroflex t), lowercase 't' = ത (dental t)",
  "Capital 'L' = ള (retroflex l), lowercase 'l' = ല (dental l)",
  "'zh' = ഴ  (the unique Malayalam sound in 'mazha')",
];

function CheatsheetSection({
  title,
  items,
}: {
  title: string;
  items: CheatsheetItem[];
}) {
  return (
    <List.Section title={title}>
      {items.map((item) => (
        <List.Item
          key={item.itrans}
          title={`${item.itrans}  →  ${item.malayalam}`}
          subtitle={`e.g. "${item.example}" = ${item.exampleMeaning}`}
          accessories={[{ text: item.malayalam }]}
          actions={
            <ActionPanel>
              <Action
                title="Copy ITRANS"
                onAction={async () => {
                  await Clipboard.copy(item.itrans);
                  await showHUD(`Copied: ${item.itrans}`);
                }}
              />
              <Action
                title="Copy Malayalam"
                onAction={async () => {
                  await Clipboard.copy(item.malayalam);
                  await showHUD(`Copied: ${item.malayalam}`);
                }}
              />
              <Action
                title={`Copy Example: ${item.example}`}
                onAction={async () => {
                  await Clipboard.copy(item.example);
                  await showHUD(`Copied: ${item.example}`);
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List.Section>
  );
}

export default function ITRANSCheatsheet() {
  return (
    <List searchBarPlaceholder="Search characters...">
      <List.Section title="💡 Tips">
        {tips.map((tip, i) => (
          <List.Item
            key={i}
            title={tip}
            accessories={[{ text: "tip" }]}
          />
        ))}
      </List.Section>

      <CheatsheetSection title="Vowels (സ്വരങ്ങൾ)" items={vowels} />
      <CheatsheetSection title="Consonants (വ്യഞ്ജനങ്ങൾ)" items={consonants} />
      <CheatsheetSection title="Special Symbols" items={special} />
    </List>
  );
}