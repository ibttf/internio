import Link from 'next/link'
import Image from 'next/image'
import Illustration from '@/public/images/hero-illustration.svg'
import Avatar01 from '@/public/images/avatar-01.jpg'
import Avatar02 from '@/public/images/avatar-02.jpg'
import Avatar03 from '@/public/images/avatar-03.jpg'
import Avatar04 from '@/public/images/avatar-04.jpg'
import Newsletter from './newsletter'
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true" />

      {/* Illustration */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
        <Image src={Illustration} className="max-w-none" priority alt="Hero Illustration" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-8 md:pt-36 md:pb-16">
          {/* Hero content */}
          <div className="max-w-3xl text-center md:text-left">
            {/* Copy */}
            <h1 className="h1 font-inter mb-6">
              Join the best tech startups in the <span className="font-nycd text-indigo-500 font-normal">industry</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8">
            Find quality tech internship & new grad postings

              <br className="hidden md:block" />  fast and stay up to date with the latest openings.
            </p>
            {/* Button + Avatars */}
            <div className="sm:flex sm:items-center sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-5">
              {/* Newletter CTA */}
              <Newsletter />

              {/* JOIN 100 PROFESSIONALS */}
              {/* <div className="sm:flex sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="inline-flex -space-x-3 -ml-0.5">
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar01}
                    width={32}
                    height={32}
                    alt="Avatar 01"
                  />
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar02}
                    width={32}
                    height={32}
                    alt="Avatar 02"
                  />
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar03}
                    width={32}
                    height={32}
                    alt="Avatar 03"
                  />
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar04}
                    width={32}
                    height={32}
                    alt="Avatar 04"
                  />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Reach <span className="text-indigo-500">100K+</span> Prefessionals
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}