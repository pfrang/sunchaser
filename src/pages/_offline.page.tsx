import Head from "next/head";
import { Flex } from "ui-kit/flex";
import { Text } from "ui-kit/text";

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>You are offline</title>
      </Head>
      <Flex alignContent={"center"} justifyItems={"center"}>
        <Text variant="body-small">You are offline</Text>
      </Flex>
    </>
  );
}
