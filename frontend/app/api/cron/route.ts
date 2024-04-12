export async function POST() {
  const response = await fetch("https://www.internio-backend.com/joblistings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  if (response.ok) {
    return new Response("Job listings fetched successfully", { status: 200 });
  } else {
    return new Response("Failed to fetch job listings", { status: 500 });
  }
}
