export const metadata = {
  title: "Internio",
  description: "Find your dream internship today.",
};
import Hero from "@/components/hero";
import PostsList from "./posts-list";

export default function Home() {
  return (
    <>
      <Hero />

      {/*  Page content */}
      <section>
        {/* Main content */}
        <div className="md:grow">
          <PostsList />
        </div>
      </section>
    </>
  );
}
