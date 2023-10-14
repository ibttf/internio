export const metadata = {
  title: "Internio",
  description: "Find your dream internship today.",
};
import Hero from "@/components/hero";
import Sidebar from "@/components/sidebar";
import PostsList from "./posts-list";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <PressLogos /> */}

      {/*  Page content */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-16">
            <div className="md:flex md:justify-between" data-sticky-container>
              <Sidebar />

              {/* Main content */}
              <div className="md:grow">
                <PostsList />
                {/* <Testimonials /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
