import {
  List,
  ActionPanel,
  Action,
  Clipboard,
  showHUD,
  getSelectedText,
  showToast,
  Toast,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { transliterate } from "./transliterate";

export default function Command() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedText, setSelectedText] = useState("");

  // Try to pre-fill with selected text on launch
  useEffect(() => {
    getSelectedText()
      .then((text) => {
        if (text) {
          setSelectedText(text);
          setInput(text);
          setOutput(transliterate(text));
        }
      })
      .catch(() => {
        // No selected text
      });
  }, []);

  function handleSearchChange(text: string) {
    setInput(text);
    setOutput(transliterate(text));
  }

  return (
    <List
      searchBarPlaceholder="Type English phonetics (e.g. namaskaram)..."
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
                    await showHUD(`Copied: ${output}`);
                  }}
                />
                <Action
                  title="Paste to Active App"
                  onAction={async () => {
                    await Clipboard.paste(output);
                  }}
                />
                <Action
                  title="Copy Input Too"
                  onAction={async () => {
                    await Clipboard.copy(`${input} = ${output}`);
                    await showHUD("Copied both");
                  }}
                />
              </ActionPanel>
            }
          />
          <List.Item
            title={input}
            subtitle="Your phonetic input"
            accessories={[{ text: "Romanized" }]}
          />
        </>
      )}

      {!output && (
        <List.EmptyView
          title="Malayalam Transliterator"
          description="Start typing in English phonetics to get Malayalam script"
        />
      )}
    </List>
  );
}