import config from "@/baseUrl";
export default async function getAllPosts() {
  const res = await fetch(`${config.baseUrl}/joblistings`);

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}
