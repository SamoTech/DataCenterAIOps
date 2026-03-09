import { incidents } from "@/lib/mock-data";

export async function GET() {
  return Response.json({
    items: incidents,
    total: incidents.length,
    generatedAt: new Date().toISOString()
  });
}
