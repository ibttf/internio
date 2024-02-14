import fetch from "node-fetch";

export default async function handler(req, res) {
  const response = await fetch("https://www.internio-backend.com/joblistings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    res.status(200).end("Updated job listings!");
  } else {
    res.status(500).end("Failed to send POST request");
  }
}
