// error.tsx entity file
'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main>
            <h2>Something went wrong!</h2>
        </main>
    );
}