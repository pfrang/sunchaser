"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-variant-regular">Something went wrong!</p>
      <p className="text-variant-regular">error message: {error.message}</p>
      <span className="py-5"></span>
      <button
        className="border-spacing-3 rounded-md border-2 border-blues-700 p-2"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
