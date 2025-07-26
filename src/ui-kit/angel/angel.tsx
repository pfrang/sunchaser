import { FC } from "react";

interface Direction {
  direction: DirectionChoice;
}

export type DirectionChoice = "left" | "down" | "right";

export const Angel: FC<Direction> = ({ direction }: Direction) => {
  switch (direction) {
    case "left":
      return (
        <svg className="size-[24px] cursor-pointer">
          <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
        </svg>
      );

    case "down":
      return (
        <svg className="size-[24px] cursor-pointer">
          <path
            d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"
            stroke={"white"}
          />
        </svg>
      );
    case "right":
      return (
        <svg className="size-[24px] cursor-pointer">
          <path d="M4 23.245l14.374-11.245L4 0.781l0.619-0.781 15.381 12-15.391 12-0.609-0.755z" />
        </svg>
      );
    default:
      throw new Error("Direction not supported");
  }
};
