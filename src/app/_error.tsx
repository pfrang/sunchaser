"use client";
import Head from "next/head";
import { Flex } from "ui-kit/flex";

export default function Error() {
  return (
    <>
      <Head>
        <title>Feilside - Sunchaser</title>
      </Head>
      <Flex
        justifyContent={"center"}
        alignContent={"center"}
        width={"100%"}
        height={"100%"}
      >
        Den siden finner vi ikke!
      </Flex>
    </>
  );
}
