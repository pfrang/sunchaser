import { AzureFunctionCoordinatesMappedItems } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { splitTimesIntoDays } from "app/utils/times-helper";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { SunchaserTable } from "./sunchaser-table";

export const SunchaserDetailedList = ({
  highlightedCard,
  resetDetailedTable,
}: {
  highlightedCard?: AzureFunctionCoordinatesMappedItems;
  resetDetailedTable: () => void;
}) => {
  if (!highlightedCard) return null;

  const days = splitTimesIntoDays(highlightedCard?.times);

  return (
    <>
      <div className="flex">
        <KeyboardArrowLeftIcon onClick={resetDetailedTable} />
        <p className="inline pl-1">{highlightedCard.primaryName}</p>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4 pb-12">
        {Object.values(days).map((day) => {
          return <SunchaserTable day={day} />;
        })}
      </div>
    </>
  );
};
