import Image from "next/image";
import Illustration from "@/public/images/hero-illustration.svg";
import Newsletter from "./newsletter";
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bg */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Illustration */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          priority
          alt="Hero Illustration"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-8 md:pt-36 md:pb-16">
          {/* Hero content */}
          <div className="max-w-3xl text-center md:text-left">
            {/* Copy */}
            <h1 className="h1 font-inter mb-6">
              Join the best tech startups in the{" "}
              <span className="font-nycd text-indigo-500 font-normal">
                industry
              </span>
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Find quality tech internship & new grad postings
              <br className="hidden md:block" /> fast and stay up to date with
              the latest openings.
            </p>
            {/* Button + Avatars */}
            <div className="sm:flex sm:items-center sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-5">
              {/* Newletter CTA */}
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
