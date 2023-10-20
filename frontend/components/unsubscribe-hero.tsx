import Image from "next/image";
import Illustration from "@/public/images/hero-illustration.svg";
import UnsubscribeNewsletter from "./unsubscribe-newsletter";
export default function UnsubscribeHero() {
  return (
    <section className="relative flex items-center justify-center h-full">
      {/* Bg */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10"
        aria-hidden="true"
      />{" "}
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
          <div className="max-w-5xl text-center md:text-left mx-auto">
            {/* Copy */}
            <h1 className="h1 font-inter mb-6">Unsubscribe</h1>
            <p className="text-lg text-gray-500 mb-8">
              We're sorry to see you go.
              <br className="hidden md:block" /> Hope to see you again soon!
            </p>
            {/* Button + Avatars */}
            <div className="sm:flex sm:items-center sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-5">
              {/* Newletter CTA */}
              <UnsubscribeNewsletter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
