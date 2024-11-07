import data from "@/app/api/opinions/data.json" with { type: "json" };

export async function GET() {
  return Response.json(data);
}