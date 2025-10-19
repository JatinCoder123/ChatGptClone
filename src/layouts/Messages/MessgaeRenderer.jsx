import React, { useRef, useState } from "react";
import { CopyButton } from "@/Components/animate-ui/components/buttons/copy";
import CodeBlock from "@/Components/CodeBlock";

const MessageRenderer = ({ content }) => {
  const contentRef = useRef(content);

  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const parseMarkdown = (text) => {
    // Handle null, undefined, or non-string content
    if (!text || typeof text !== "string") {
      return <span>No content available</span>;
    }
    const elements = [];
    let currentIndex = 0;
    let key = 0;

    // Regex patterns
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;

    const processedRanges = [];
    let match;
    // Process code blocks
    let codeBlockIndex = 0; // outside your loop

    while ((match = codeBlockRegex.exec(text)) !== null) {
      const [fullMatch, language, code] = match;
      const start = match.index;
      const end = start + fullMatch.length;

      if (start > currentIndex) {
        elements.push(
          <span key={key++}>{text.substring(currentIndex, start)}</span>
        );
      }

      const thisIndex = codeBlockIndex++; // stable index

      elements.push(
        <CodeBlock
          key={key++}
          code={code.trim()}
          language={language || "text"}
          onCopy={(txt) => copyToClipboard(txt, thisIndex)}
          isCopied={copiedIndex === thisIndex}
        />
      );

      processedRanges.push({ start, end });
      currentIndex = end;
    }

    // Reset regex
    codeBlockRegex.lastIndex = 0;

    // Process tables
    while ((match = tableRegex.exec(text)) !== null) {
      const [fullMatch, headerRow, bodyRows] = match;
      const start = match.index;
      const end = start + fullMatch.length;

      // Check if this range overlaps with code blocks
      if (processedRanges.some((r) => start >= r.start && start < r.end)) {
        continue;
      }

      if (start > currentIndex) {
        const textBefore = text.substring(currentIndex, start);
        elements.push(processText(textBefore, key));
        key++;
      }

      const headers = headerRow
        .split("|")
        .map((h) => h.trim())
        .filter((h) => h);
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row) =>
          row
            .split("|")
            .map((cell) => cell.trim())
            .filter((cell) => cell)
        );

      elements.push(<Table key={key++} headers={headers} rows={rows} />);

      processedRanges.push({ start, end });
      currentIndex = end;
    }

    // Process remaining text
    if (currentIndex < text.length) {
      const remainingText = text.substring(currentIndex);
      elements.push(processText(remainingText, key));
    }

    return elements.length > 0 ? elements : [<span key={0}>{text}</span>];
  };

  const processText = (text, startKey) => {
    const lines = text.split("\n");
    const elements = [];
    let key = startKey;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const content = headingMatch[2];
        const HeadingTag = `h${level}`;
        const className =
          level === 1
            ? "text-xl sm:text-2xl md:text-3xl font-bold mt-4 mb-2"
            : level === 2
            ? "text-lg sm:text-xl md:text-2xl font-bold mt-3 mb-2"
            : "text-base sm:text-lg md:text-xl font-semibold mt-2 mb-1";

        elements.push(
          React.createElement(
            HeadingTag,
            { key: key++, className, style: { color: "var(--text-primary)" } },
            processInline(content)
          )
        );
        continue;
      }

      // Check for lists
      const listMatch = line.match(/^(\d+\.|\-|\*)\s+(.+)$/);
      if (listMatch) {
        const content = listMatch[2];
        elements.push(
          <li
            key={key++}
            className="ml-4 sm:ml-6 mb-1 text-sm sm:text-base"
            style={{ color: "var(--text-primary)" }}
          >
            {processInline(content)}
          </li>
        );
        continue;
      }

      // Regular text
      if (line.trim()) {
        elements.push(
          <p
            key={key++}
            className="mb-2 text-sm sm:text-base leading-relaxed break-all"
            style={{ color: "var(--text-primary)" }}
          >
            {processInline(line)}
          </p>
        );
      } else {
        elements.push(<br key={key++} />);
      }
    }

    return <div key={startKey}>{elements}</div>;
  };

  const processInline = (text) => {
    const elements = [];
    let lastIndex = 0;
    let key = 0;

    // Process bold text
    const boldRegex = /\*\*(.+?)\*\*/g;
    const inlineCodeRegex = /`([^`]+)`/g;

    // Combine all inline patterns
    const combined = new RegExp(
      `${boldRegex.source}|${inlineCodeRegex.source}`,
      "g"
    );

    let match;
    while ((match = combined.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      if (match[1]) {
        // Bold text
        elements.push(
          <strong
            key={key++}
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {match[1]}
          </strong>
        );
      } else if (match[2]) {
        // Inline code
        elements.push(
          <code
            key={key++}
            className="px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono break-all"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--accent-primary)",
            }}
          >
            {match[2]}
          </code>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements.length > 0 ? elements : text;
  };

  return (
    <div
      className="w-full max-w-full px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-2xl"
      ref={contentRef}
    >
      {content.map((item, index) => (
        <div
          className="prose prose-sm sm:prose-base max-w-none break-words "
          key={index}
        >
          {parseMarkdown(item.content)}
        </div>
      ))}

      <CopyButton
        content={contentRef.current?.innerText}
        className={`text-xs px-2 py-1 rounded cursor-pointer bg-[var(--background)] text-[var(--text-primary)] hover:bg-[var(--surface)]  `}
      ></CopyButton>
    </div>
  );
};

const Table = ({ headers, rows }) => {
  return (
    <div className="my-3 sm:my-4 overflow-x-auto -mx-2 sm:mx-0">
      <div className="inline-block min-w-full align-middle px-2 sm:px-0">
        <table
          className="min-w-full border rounded-lg overflow-hidden"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
          }}
        >
          <thead style={{ backgroundColor: "var(--accent-primary)" }}>
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap"
                  style={{ color: "var(--background)" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                style={{
                  backgroundColor: "var(--background)",
                }}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 border-t text-xs sm:text-sm break-words"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageRenderer;
