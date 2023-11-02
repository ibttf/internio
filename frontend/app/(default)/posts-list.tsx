"use client";
import { useState, useEffect } from "react";
import PostItem from "./post-item";
import getAllPosts from "@/lib/getAllPosts";
import Sidebar from "@/components/sidebar";
interface Post {
  id: number;
  title: string;
  company: string;
  company_link: string;
  company_logo: string;
  locations: string[];
  apply_link: string;
  sponsorship: boolean;
  closed: boolean;
  categories: string[];
  date: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //sidebar
  const [remoteJob, setRemoteJob] = useState<boolean>(false);

  // Job Type
  const [jobTypes, setJobTypes] = useState({
    coop: false,
    internship: true,
  });

  // Job Roles
  const [jobRoles, setJobRoles] = useState({
    swe: true, // set to true because it's defaultChecked in your code
    datascience: false,
    research: false,
    machinelearning: false,
  });

  // Location
  const [location, setLocation] = useState("Anywhere");

  // Sponsorship
  const [sponsorship, setSponsorship] = useState(false);

  const handleFilterClear = () => {
    setJobTypes({
      coop: false,
      internship: false,
    });
    setJobRoles({
      swe: false,
      datascience: false,
      research: false,
      machinelearning: false,
    });

    setLocation("Anywhere");
    setRemoteJob(false);
    setSponsorship(false);
  };

  useEffect(() => {
    async function fetchPosts() {
      const res = await getAllPosts();
      const data = await res;
      // Sort the posts by date
      const sortedData = data.sort((a: Post, b: Post) => {
        const monthMapping: { [key: string]: number } = {
          Jan: 1,
          Feb: 2,
          Mar: 3,
          Apr: 4,
          May: 5,
          Jun: 6,
          Jul: 7,
          Aug: 8,
          Sep: 9,
          Oct: 10,
          Nov: 11,
          Dec: 12,
        };
        let [monthStrA, dayA] = a.date.split(" ");
        if (dayA === "2023") {
          dayA = "01";
        }
        let [monthStrB, dayB] = b.date.split(" ");
        if (dayB === "2023") {
          dayB = "01";
        }
        let monthA = monthMapping[monthStrA];
        let monthB = monthMapping[monthStrB];
        let dateA = new Date(
          new Date().getFullYear(),
          monthA - 1,
          parseInt(dayA)
        );
        let dateB = new Date(
          new Date().getFullYear(),
          monthB - 1,
          parseInt(dayB)
        );
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
        return dateA.getTime() - dateB.getTime();
      });

      setPosts(sortedData);
    }
    fetchPosts();
  }, []);
  function filterPosts(post: Post): boolean {
    // Check if the post matches the remote job condition
    if (remoteJob && !post.locations.includes("Remote")) {
      return false;
    }

    // Check if the post matches the location condition
    if (
      location &&
      location !== "Anywhere" &&
      !post.locations.some((loc) => loc.includes(location))
    ) {
      return false;
    }

    // Check if the post matches the search query condition
    if (
      searchQuery &&
      !(
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some((category) =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        post.locations.some((location) =>
          location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    ) {
      return false;
    }
    // Check if the post matches the sponsorship condition
    if (sponsorship && !post.sponsorship) {
      return false;
    }

    // Check if the post matches the job type conditions
    if (
      (jobTypes.internship && !post.categories.includes("Internship")) ||
      (jobTypes.coop && !post.categories.includes("Co-op"))
    ) {
      return false;
    }

    // Check if the post matches the job role conditions
    if (
      (jobRoles.swe && !post.categories.includes("Software Engineering")) ||
      (jobRoles.datascience && !post.categories.includes("Data Science")) ||
      (jobRoles.research && !post.categories.includes("Research")) ||
      (jobRoles.machinelearning &&
        !post.categories.includes("Machine Learning"))
    ) {
      return false;
    }

    // If none of the above conditions match, include the post
    return true;
  }

  const filteredPosts = posts.filter((post: Post) => filterPosts(post));
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-8 md:py-16">
        <div className="md:flex md:justify-between" data-sticky-container>
          <Sidebar
            handleFilterClear={handleFilterClear}
            remoteJob={remoteJob}
            setRemoteJob={setRemoteJob}
            jobTypes={jobTypes}
            setJobTypes={setJobTypes}
            jobRoles={jobRoles}
            setJobRoles={setJobRoles}
            sponsorship={sponsorship}
            setSponsorship={setSponsorship}
            location={location}
            setLocation={setLocation}
          />
          <div className="pb-8 md:pb-16">
            <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search jobs, locations, companies..."
              className="w-full border-2 border-blue-300 py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-500 rounded-lg mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* List container with flex properties */}
            <div className="flex flex-wrap space-y-2">
              {filteredPosts.map((post: Post) => {
                console.log(post);
                return (
                  <div key={post.id} className="w-full">
                    <PostItem {...post} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
