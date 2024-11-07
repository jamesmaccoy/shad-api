import { NextRequest } from "next/server";
import data from "../data.json" with { type: "json" };

type RouteParams = { params: Promise<{ opinion: string }> };

export const GET = async (request: NextRequest, { params }: RouteParams) => {
  const { opinion } = await params;

  if (!opinion) {
    return Response.json("No opinion name provided.");
  }

  const opinionData = data.find((item) =>
    item.name.toLowerCase() === opinion.toLowerCase()
  );

  return Response.json(opinionData ? opinionData : "No opinion found.");
};
