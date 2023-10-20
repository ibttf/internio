"use client";
import { useState, useEffect } from "react";
import PostItem from "./post-item";
import getAllPosts from "@/lib/getAllPosts";

interface Post {
  id: number;
  title: string;
  company: string;
  company_link: string;
  locations: string[];
  apply_link: string;
  sponsorship: boolean;
  closed: boolean;
  categories: string[];
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchPosts() {
      const res = await getAllPosts();
      const data = await res;
      console.log(data);
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // Filter the posts based on the search query
  const filteredPosts = posts.filter((post: Post) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.company.toLowerCase().includes(searchLower) ||
      post.categories.some((category) =>
        category.toLowerCase().includes(searchLower)
      ) ||
      post.locations.some((location) =>
        location.toLowerCase().includes(searchLower)
      )
    );
  });
  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search jobs..."
        className="bg-gray-200 border-2 border-blue-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-500 w-full max-w-md mx-auto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* List container */}
      <div className="flex flex-col space-y-2">
        {filteredPosts.map((post: Post) => {
          return <PostItem key={post.id} {...post} />;
        })}
      </div>
    </div>
  );
}
