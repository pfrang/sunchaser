import { useEffect, useState } from "react";
import { isEmpty as _isEmpty } from "lodash";
import { AxiosError } from "axios";

interface ConditionalPresenterProps<Data, Error> {
  isLoading: boolean;
  error: Error;
  data: Data;
  renderData: (data: NonNullable<Data>) => JSX.Element;
  renderLoading?: () => JSX.Element;
  renderError?: () => JSX.Element;
}

export enum StateStage {
  Initial = "initial",
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
}

export const ConditionalPresenter = <Data, Error>({
  isLoading,
  error,
  data,
  renderData,
  renderLoading,
  renderError,
}: ConditionalPresenterProps<Data, Error>) => {
  const [state, setState] = useState<StateStage>(StateStage.Initial);

  useEffect(() => {
    Boolean(error) && setState(StateStage.Error);
    isLoading && setState(StateStage.Loading);

    if (data !== undefined && data !== null && !isLoading) {
      setState(StateStage.Loaded);
    }
  }, [isLoading, error, data]);

  switch (state) {
    case StateStage.Initial:
      return isLoading && renderLoading ? renderLoading() : <></>;
    case StateStage.Error:
      return typeof renderError === "function"
        ? renderError()
        : ErrorAlert(error);

    case StateStage.Loading:
      return typeof renderLoading === "function" ? renderLoading() : <></>;
    case StateStage.Loaded:
      return (
        <>{_isEmpty(data) ? <></> : renderData(data as NonNullable<Data>)}</>
      );
    default:
      throw new Error("Illegal state!");
  }
};

function ErrorAlert(error) {
  const message = isAxiosError(error)
    ? // @ts-ignore // TODO fix
      error.response.data.error
    : JSON.stringify(error);

  return (
    <>
      <div
        className={`${
          message ? "block" : "hidden"
        }fixed inset-x-4 bottom-16 z-auto flex items-center justify-between rounded-lg bg-red-500 p-4 text-white shadow-lg`}
      >
        <div>
          <h2 className="font-bold">Error!</h2>
          <p>{message}</p>
        </div>
        <button className=" rounded p-1 hover:bg-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

const isAxiosError = (error: any): error is AxiosError => {
  return error?.isAxiosError && error?.response?.data?.error;
};
