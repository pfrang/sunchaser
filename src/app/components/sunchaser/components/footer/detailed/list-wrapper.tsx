import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ListWrapperProps {
  location?: string;
  resetDetailedTable: () => void;
  renderTable: () => JSX.Element;
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
        className="flex cursor-pointer items-center"
      >
        <KeyboardArrowLeftIcon />
        <p className="pl-4 text-2xl">{location}</p>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4">{renderTable()}</div>
    </>
  );
};
