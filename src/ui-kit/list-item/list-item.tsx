import { WeatherIconList } from "ui-kit/weather-icon/weather-icon-list";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { WeatherIcon } from "ui-kit/weather-icon/weather-icon";
interface ListItemProps {
  header?: {
    placement: number;
    name: string;
  };
  body: {
    icon: string;
    temperature: number;
    rain: number;
    wind: number;
  };
  onClick?: () => void;
}

export const ListItem = ({ header, body, onClick }: ListItemProps) => {
  return (
    <div className="rounded-lg bg-greens-300 px-3 py-2">
      {header && (
        <div className="flex items-center gap-4">
          <div className="flex size-6 items-center justify-center rounded-full bg-greens-400">
            <p className="text-white">{header.placement}</p>
          </div>
          <p className="">{header.name}</p>
        </div>
      )}
      <span className="block h-2"></span>
      <table className="w-full table-fixed" id="row-wrapper">
        <tbody>
          <tr>
            <td className="w-1/12 text-center align-middle">
              <WeatherIcon
                icon={body.icon as WeatherIconList}
                className="object-contain"
              />
            </td>
            <td className="w-3/12">
              <div className="flex flex-col items-center">
                <span className="max-w-full truncate">Temp.°C</span>
                <span className="text-red-500">
                  {body.temperature.toFixed(1)}
                </span>
              </div>
            </td>
            <td className="w-3/12">
              <div className="flex flex-col items-center">
                <span className="max-w-full truncate">Nedbør mm</span>
                <span className="text-blue-500">{body.rain.toFixed(1)}</span>
              </div>
            </td>
            <td className="w-3/12">
              <div className="flex flex-col items-center">
                <span className="max-w-full truncate">Vind m/s</span>
                <span>{body.wind.toFixed(1)}</span>
              </div>
            </td>

            <td onClick={onClick} className="w-2/12 text-center align-middle">
              {onClick && (
                <div>
                  <KeyboardArrowRightIcon />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
