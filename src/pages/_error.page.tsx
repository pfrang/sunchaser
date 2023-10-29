import Head from "next/head";
import { Flex } from "ui-kit/flex";

export default function Error(props) {
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

// export const getStaticProps = async () => {
//   const h = {
//     hei: "du",
//   };

//   return {
//     props: {
//       h,
//     },
//     revalidate: true,
//   };
// };
