import Head from "next/head";
import { Flex } from "ui-kit/flex";
import { Text } from "ui-kit/text";

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>You are offline</title>
      </Head>
      <Flex
        position={"absolute"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Text color="white" variant="body-small">
          You are offline
        </Text>
        <br />
        <Text color="white" variant="body-small">
          Please check your internet connection
        </Text>
      </Flex>
    </>
  );
}
