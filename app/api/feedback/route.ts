type FeedbackPayload = {
  name?: string;
  email?: string;
  rating?: number;
  role?: string;
  teamSize?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as FeedbackPayload;

  if (!body.name || !body.email || !body.role || !body.message) {
    return Response.json(
      {
        ok: false,
        message: "name, email, role, and message are required"
      },
      { status: 400 }
    );
  }

  const rating = Number(body.rating ?? 0);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return Response.json(
      {
        ok: false,
        message: "rating must be between 1 and 5"
      },
      { status: 400 }
    );
  }

  return Response.json({
    ok: true,
    message: "Feedback received. Thanks for helping shape DataCenterAIOps.",
    submission: {
      name: body.name,
      email: body.email,
      role: body.role,
      teamSize: body.teamSize ?? "not provided",
      rating,
      message: body.message
    },
    receivedAt: new Date().toISOString(),
    nextStep: "Connect this route to a database, email inbox, or CRM for persistence."
  });
}
