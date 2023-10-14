import getAllPosts from "@/lib/getAllPosts";
import PostItem from "./post-item";
import { JSX, use } from "react";
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

async function getPosts() {
  return await getAllPosts();
}

export default function PostsList() {
  const posts = use(getPosts());

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* List container */}
      <div className="flex flex-col">
        {posts.map((post: any) => {
          return <PostItem key={post.id} {...post} />;
        })}
      </div>
    </div>
  );
}
