import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ReactNode } from "react";

interface ListWrapperProps {
  location?: string;
  resetDetailedTable: () => void;
  renderTable: () => ReactNode;
}

export const ListWrapper = ({
  location,
  renderTable,
  resetDetailedTable,
}: ListWrapperProps) => {
  return (
    <>
      <div className="sticky top-0 flex items-center bg-white pb-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={resetDetailedTable}
        >
          <KeyboardArrowLeftIcon />
          <p className="pl-2 text-2xl">{location}</p>
        </div>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4">{renderTable()}</div>
    </>
  );
};
