import { services } from "@/lib/mock-data";

export async function GET() {
  return Response.json({
    items: services,
    total: services.length,
    generatedAt: new Date().toISOString()
  });
}
