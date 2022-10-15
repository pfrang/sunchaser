import axios from "axios";
import useSWR from "swr";

export const useGMapsAutoSearch = (townSearch) => {
  const h = "hei";

  if (!townSearch) return { data: null, isLoading: true, error: null };
  const params = {
    input: townSearch,
  };

  const fetcher = async (url) =>
    await axios
      .get(url, {
        params,
      })
      .then((res) => res.data);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR("/api/google-maps/auto-search", fetcher);

  const isLoading = !data && !error;

  return { data, isLoading, error };
};
