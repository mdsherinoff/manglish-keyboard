import { List, ActionPanel, Action, Clipboard, showHUD } from "@raycast/api";
import { useState } from "react";
import { transliterate } from "./transliterate";
import { addToHistory } from "./history-utils";

export default function Command() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleSearchChange(text: string) {
    setInput(text);
    const result = transliterate(text);
    setOutput(result);
  }

  return (
    <List
      searchBarPlaceholder="Type ITRANS phonetics (e.g. malayaaLaM)..."
      onSearchTextChange={handleSearchChange}
      throttle={false}
    >
      {output && (
        <>
          <List.Item
            title={output}
            subtitle="Malayalam Output"
            accessories={[{ text: `← ${input}` }]}
            actions={
              <ActionPanel>
                <Action
                  title="Copy to Clipboard"
                  onAction={async () => {
                    await Clipboard.copy(output);
                    await addToHistory(input, output); 
                    await showHUD(`Copied: ${output}`);
                  }}
                />
                <Action
                  title="Paste to Active App"
                  onAction={async () => {
                    await Clipboard.paste(output);
                    await addToHistory(input, output);
                  }}
                />
                <Action
                  title="Copy Input Too"
                  onAction={async () => {
                    await Clipboard.copy(`${input} = ${output}`);
                    await addToHistory(input, output);
                    await showHUD("Copied both");
                  }}
                />
              </ActionPanel>
            }
          />
          <List.Item title={input} subtitle="Your phonetic input" accessories={[{ text: "Romanized" }]} />
        </>
      )}

      {!output && (
        <List.EmptyView title="Malayalam Transliterator" description="Type ITRANS phonetics to get Malayalam script" />
      )}
    </List>
  );
}
