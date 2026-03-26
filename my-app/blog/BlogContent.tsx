"use client";

import ReactMarkdown from "react-markdown";

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-4xl font-bold tracking-tight mt-10 mb-4 text-gray-900">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-bold tracking-tight mt-8 mb-3 text-gray-900">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-lg leading-relaxed text-gray-800 mb-4">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 text-lg text-gray-800 mb-4 ml-4">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1 text-lg text-gray-800 mb-4 ml-4">{children}</ol>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[#AE572C] pl-5 italic text-gray-600 my-6">{children}</blockquote>
  ),
  hr: () => <hr className="border-stone-200 my-8" />,
};

export default function BlogContent({ content }: { content: string }) {
  return (
    <article className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 mt-10 pb-24">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </article>
  );
}
