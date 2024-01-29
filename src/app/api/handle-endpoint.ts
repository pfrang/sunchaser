import { NextResponse } from "next/server";

type GetOpenResponse<R> = () => Promise<R>;

const handleOpenEndpoint = async <R>(getResponse: GetOpenResponse<R>) => {
  try {
    const response = await getResponse();
    return NextResponse.json(response, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export class HandleEndpoint {
  static Open = handleOpenEndpoint;
}
