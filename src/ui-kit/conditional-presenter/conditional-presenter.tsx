import { ReactNode, useEffect, useState } from "react";
import { isEmpty as _isEmpty } from "lodash";
import { render } from "react-dom";

interface ConditionalPresenterProps<Data, Error> {
  isLoading: boolean;
  error: Error;
  data: Data;
  renderData: (data: Data) => JSX.Element;
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

    data !== undefined &&
      data !== null &&
      !isLoading &&
      setState(StateStage.Loaded);
  }, [isLoading, error, data]);

  switch (state) {
    case StateStage.Initial:
      return isLoading ? renderLoading() : <></>;
    case StateStage.Error:
      return renderError() ? renderError() : <></>;
    case StateStage.Loading:
      return renderLoading();
    case StateStage.Loaded:
      return <>{_isEmpty(data) ? <></> : renderData(data)}</>;
    default:
      throw new Error("Illegal state!");
  }
};
