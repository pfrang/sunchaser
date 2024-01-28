import { NextResponse } from "next/server";

type GetOpenResponse<R> = () => Promise<R>;

const handleOpenEndpoint = async (getResponse: GetOpenResponse<R>) => {
  try {
    const response = await getResponse();
    return Response.json(response, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Response.json(error, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const handleCreateOpenResponse = <R>(response: R) => {
  return NextResponse.json(response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export class HandleEndpoint {
  static Open = handleOpenEndpoint;

  static createResponse = handleCreateOpenResponse;
}
