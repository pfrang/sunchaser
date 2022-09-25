import axios from "axios";

export const fetcher = async (...input) => {
  const [url, params] = input
  const response = await axios
    .get(url, {
      params,
    })
    .then((res) => res.data);
  return response.response
}
