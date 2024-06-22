import Image, { ImageProps } from "next/image";

import { WeatherIconList } from "./weather-icon-list";

interface WeatherIconProps extends Omit<ImageProps, "src" | "alt"> {
  icon: WeatherIconList;
}

export const WeatherIcon = ({
  icon,
  ...props // Spread the rest of the props
}: WeatherIconProps) => {
  const iconRef = WeatherIconList[icon.charAt(0).toUpperCase() + icon.slice(1)];

  return (
    <Image
      alt="partlySunny"
      src={`/icons/black/svg/${iconRef}`}
      width={props.width || 32}
      height={props.height || 32}
      {...props}
    />
  );
};
