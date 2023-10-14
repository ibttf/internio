export default async function getAllPosts() {
  const res = await fetch(
    "https://raw.githubusercontent.com/cruip/cruip-dummy/main/job-board-posts.json"
  );

  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
