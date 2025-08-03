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
      <div
        onClick={resetDetailedTable}
        className="sticky top-0 flex cursor-pointer items-center bg-white pb-2"
      >
        <KeyboardArrowLeftIcon />
        <p className="pl-4 text-2xl">{location}</p>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4">{renderTable()}</div>
    </>
  );
};
