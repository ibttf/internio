"use client";
import { useState, useEffect } from "react";
import PostItem from "./post-item";
import getAllPosts from "@/lib/getAllPosts";

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

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await getAllPosts();
      const data = await res;
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* List container */}
      <div className="flex flex-col">
        {posts.map((post: Post) => {
          return <PostItem key={post.id} {...post} />;
        })}
      </div>
    </div>
  );
}
