import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Quote {
  content: string;
  author: string;
}

const QuoteComponent: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://quotable.io/random");
        const data = response.data;
        setQuote({ content: data.content, author: data.author });
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className=''>
      {quote ? (
        <div className='flex flex-col px-[20px] text-center mt-10'>
          <p className='font-extralight '>{quote.content}</p>
          <p className='text-primary' >- {quote.author}</p>
        </div>
      ) : (
        <span className="loading loading-dots loading-lg mt-10"></span>
      )}
    </div>
  );
};

export default QuoteComponent;
