import { NextRequest } from "next/server";
import data from "../opinions/data.json" with { type: "json" };

type RouteParams = { params: Promise<{ atom: string }> };

export const GET = async (request: NextRequest, { params }: RouteParams) => {
  const { atom } = await params;

  if (!atom) {
    return Response.json("No dinosaur name provided.");
  }

  const atomData = data.find((item) =>
    item.name.toLowerCase() === atom.toLowerCase()
  );

  return Response.json(atomData ? atomData : "No dinosaur found.");
};
