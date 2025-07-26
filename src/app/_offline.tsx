"use client";
import Head from "next/head";

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>You are offline</title>
      </Head>
      <div className="absolute flex h-full flex-col items-center justify-center">
        <p>You are offline</p>
        <br />
        <p>Please check your internet connection</p>
      </div>
    </>
  );
}
