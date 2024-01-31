"use client";
import { AxiosError } from "axios";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message = isAxiosError(error)
    ? //@ts-ignore // TODO fix
      error.response.data.error
    : typeof error === "object"
      ? JSON.stringify(error)
      : error;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-variant-regular">Something went wrong!</p>
      <p className="text-variant-regular">error message: {message}</p>
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

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};
