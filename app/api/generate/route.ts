export async function POST(req: Request) {
  const body = await req.json();
  const { job, profile } = body;

  const prompt = `
You are a professional freelancer.

Write a high-converting proposal based on:

Job:
${job}

Profile:
${profile}

Make it:
- Personalized
- Short and powerful
- Friendly tone
`;

  return Response.json({
    proposal: "This is a sample AI proposal based on your input.",
  });
}