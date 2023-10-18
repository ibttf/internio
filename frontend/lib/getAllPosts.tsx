export default async function getAllPosts() {
  const res = await fetch("http://localhost:8000/joblistings");

  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
