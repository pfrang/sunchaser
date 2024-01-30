import { useEffect, useState } from "react";
import { isEmpty as _isEmpty } from "lodash";

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
      return typeof renderError === "function" ? (
        renderError()
      ) : (
        <div
          className="bg-red-100 border-red-400 text-red-700 relative rounded border px-4 py-3"
          role="alert"
        >
          <strong className="font-bold">Holy smokes!</strong>
          <span className="block sm:inline">
            Something seriously bad happened.
          </span>
          <span className="absolute inset-y-0 right-0 px-4 py-3">
            <svg
              className="fill-current text-red-500 h-6 w-6"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      );
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
