import { useRouter } from "next/router";
import { useForecast } from "pages/hooks/use-forecast";
import { Flex } from "ui-kit/flex";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";

import { Spacer } from "../../../ui-kit/spacer/spacer";

import { ForecastTableContainer } from "./components/table-container";

export const Forecast = () => {
  const router = useRouter();

  const { data, isLoading, error } = useForecast(
    {
      params: router.query,
    },
    router.isReady && Boolean(router.query.lat),
  );

  return (
    <Flex height={"100%"} flexDirection={"column"} gap={4}>
      <Spacer height={80} />
      <ConditionalPresenter
        isLoading={isLoading}
        renderLoading={() => (
          <Flex position={"absolute"} bottom={"50%"} left={"50%"}>
            <Spinner />{" "}
          </Flex>
        )}
        error={error}
        data={data}
        renderData={(data) => {
          const { days } = data;

          return <ForecastTableContainer rows={days} />;
        }}
      />
    </Flex>
  );
};
