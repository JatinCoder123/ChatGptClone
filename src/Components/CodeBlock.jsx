import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ code, language, onCopy, isCopied }) => {
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    async function loadHighlight() {
      const html = await codeToHtml(code, {
        lang: language,
        theme: "vitesse-dark",
      });
      setHighlightedCode(html);
    }
    loadHighlight();
  }, [code, language]);

  return (
    <div
      className="my-3 sm:my-4 rounded-lg overflow-hidden border shadow-sm"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
        fontFamily: "Fira Code, monospace",
      }}
    >
      {/* Header with language and copy button */}
      <div
        className="px-3 sm:px-4 py-2 flex justify-between items-center border-b"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <span
          className="text-xs sm:text-sm font-mono font-semibold"
          style={{ color: "var(--text-secondary)" }}
        >
          {language}
        </span>
        <button
          onClick={() => onCopy(code)}
          className="flex items-center gap-1 sm:gap-2 transition-opacity hover:opacity-80 cursor-pointer"
          style={{ color: "var(--text-secondary)" }}
        >
          {isCopied ? (
            <>
              <Check size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm xs:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Shiki highlighted code */}
      <div
        className="p-3 sm:p-4 overflow-x-auto rounded-b"
        style={{
          backgroundColor: "var(--background-secondary)",
        }}
      >
        <div
          className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words"
          style={{
            fontFamily: "Fira Code, monospace",
            borderRadius: "0.375rem",
          }}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};

export default CodeBlock;
