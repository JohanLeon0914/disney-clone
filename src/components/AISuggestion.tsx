"use client";
import useSWR from "swr";
const fetcher = (term: string) =>
  fetch("/api/suggestion?term=" + term).then((res) => res.json());

function AISuggestion({ term }: { term: string }) {
  const { data, error, isLoading, isValidating } = useSWR(
    "suggestion",
    () => fetcher(term),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const generateText = () => {
    if (isLoading || isValidating) {
      return (
        <>
          <div className="animated-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
        </>
      );
    }
    if (error) return <>Error...</>;
    if (!data) return <>No data founded.</>;

    return (
      <>
        <div className="animate-pulse rounded-full h-10 w-10 bg-gradient-to-t from-white border-2 flex-shrink-0 border-white" />

        <div>
          <p className="text-sm text-gray-400">AI Assistant Suggests: {""}</p>
          <p className="italic text-xl">&quot;{data.suggestion}&quot;</p>
        </div>
      </>
    );
  };

  return (
    <div className="flex space-x-5 items-center px-10">{generateText()}</div>
  );
}

export default AISuggestion;
