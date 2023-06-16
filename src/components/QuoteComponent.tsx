async function fetchData() {
  const res = await fetch(`https://api.quotable.io/quotes/random?tags=competition`);

  if (!res.ok) {
    throw new Error('Fail fetch');
  }

  return res.json();
}

async function QuoteComponent() {
  try {
    const quote = await fetchData();

    return (
      <div className="relative h-full">
        {quote ? (
          <div className="mt-10 flex flex-col px-[20px] text-center">
            <p className="font-extralight">{quote.content}</p>
            <p className="text-primary">- {quote.author}</p>
          </div>
        ) : (
          <span className="loading loading-ring loading-lg absolute left-1/2 top-1/2 mt-20 -translate-x-1/2 -translate-y-1/2 transform text-primary"></span>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering Quotes:", error);
    return null;
  }
}

export default QuoteComponent;
