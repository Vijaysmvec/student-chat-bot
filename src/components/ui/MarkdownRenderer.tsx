"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import katex from "katex";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Pre-process content for inline math: replace $...$ and $$...$$ with rendered KaTeX html
  const renderMathContent = (text: string) => {
    // Replace display math $$...$$
    let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
      try {
        return `<div class="katex-display-wrapper my-3 overflow-x-auto py-1">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch {
        return `$$${math}$$`;
      }
    });

    // Replace inline math $...$
    processed = processed.replace(/(?<!\\)\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return `$${math}$`;
      }
    });

    return processed;
  };

  const processedText = renderMathContent(content);

  return (
    <div className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom Code Block with Copy Button
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match && !String(children).includes("\n");
            const codeString = String(children).replace(/\n$/, "");

            if (isInline) {
              return (
                <code className="bg-slate-800/90 text-cyan-300 font-mono text-xs md:text-sm px-1.5 py-0.5 rounded border border-slate-700/60" {...props}>
                  {children}
                </code>
              );
            }

            return <CodeBlock language={match ? match[1] : "code"} code={codeString} />;
          },
          // Custom Table Styling
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 rounded-xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left border-collapse text-sm">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return <th className="border-b border-slate-800 bg-slate-800/50 px-4 py-2.5 font-semibold text-slate-100">{children}</th>;
          },
          td({ children }) {
            return <td className="border-b border-slate-800/60 px-4 py-2 text-slate-300">{children}</td>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-violet-500 bg-violet-500/10 px-4 py-2 rounded-r-xl italic text-slate-300 my-3">
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
                {children}
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="text-xl md:text-2xl font-bold text-white mt-4 mb-2 tracking-tight">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-lg md:text-xl font-bold text-white mt-3 mb-2 tracking-tight">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-base md:text-lg font-semibold text-violet-300 mt-2.5 mb-1.5">{children}</h3>;
          },
          p({ children }) {
            // Render HTML directly for KaTeX parsed spans
            if (typeof children === "string" && (children.includes("katex") || children.includes("<div") || children.includes("<span"))) {
              return <div dangerouslySetInnerHTML={{ __html: children }} className="my-2" />;
            }
            return <p className="my-2 leading-relaxed text-slate-200">{children}</p>;
          },
        }}
      >
        {processedText}
      </ReactMarkdown>
    </div>
  );
};

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950/90 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/60 text-xs text-slate-400 font-mono">
        <span className="uppercase tracking-wider font-semibold text-violet-400">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed text-slate-200">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
