import React, { useEffect, useState } from "react";
import axios from "axios";

interface Quote {
  content: string;
  author: string;
}

const QuoteComponent: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://quotable.io/random?tags=Character");
        const data = response.data as Quote;
        setQuote({ content: data.content, author: data.author });
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    void fetchQuote();
  }, []);

  return (
    <div className="relative h-full">
      {quote ? (
        <div className="flex flex-col text-center md:max-w-[700px] px-[20px]">
          <p className="font-extralight max-w-[350px]">&quot;{quote.content}&quot;</p>
          <p className="text-primary mt-5">- {quote.author}</p>
        </div>
      ) : (
        <span className="loading loading-ring loading-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-primary"></span>
      )}
    </div>
  );
};

export default QuoteComponent;
