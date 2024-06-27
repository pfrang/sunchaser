import { AzureFunctionCoordinatesMappedItems } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { splitTimesIntoDays } from "app/utils/times-helper";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { SunchaserTable } from "./sunchaser-table";

interface ListWrapperProps {
  location?: string;
  resetDetailedTable: () => void;
  renderTable: () => JSX.Element;
}

export const SunchaserDetailedList = ({
  location,
  renderTable,
  resetDetailedTable,
}: ListWrapperProps) => {
  return (
    <>
      <div className="flex">
        <KeyboardArrowLeftIcon onClick={resetDetailedTable} />
        <p className="inline pl-1">{location}</p>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4">{renderTable()}</div>
    </>
  );
};
