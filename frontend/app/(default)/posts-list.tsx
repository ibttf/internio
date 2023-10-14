import getAllPosts from "@/lib/getAllPosts";
import PostItem from "./post-item";
import Newsletter from "@/components/newsletter";

interface Post {
  id: number;
  sticky: boolean;
  title: string;
  name: string;
  image: string;
  tag1: string;
  tag2: string;
  date: string;
}

export default async function PostsList() {
  const postsData: Promise<Post[]> = getAllPosts();
  const posts = await postsData;

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* List container */}
      <div className="flex flex-col">
        {posts.map((post) => {
          return <PostItem key={post.id} {...post} />;
        })}
      </div>
    </div>
  );
}
