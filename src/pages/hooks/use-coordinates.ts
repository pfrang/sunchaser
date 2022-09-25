import axios from "axios";
import useSWR from "swr";

export const useCoordinates = (userInput) => {

  const params = {
    input: userInput
  }

  const fetcher = async (url) =>
    await axios
      .get(url, {
        params,
      })
      .then((res) => res.data);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR("/api/coordinates", fetcher);

  const isLoading = !data && !error;

  return { data, isLoading, error };
};
