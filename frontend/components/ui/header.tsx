import Link from 'next/link'
import HeaderLogo from '@/components/ui/header-logo'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <HeaderLogo />
          </div>

          {/* Desktop navigation */}
          <nav className="flex grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link className="text-sm font-medium text-indigo-500 hover:underline px-3 lg:px-5 py-2 flex items-center" href="/signin">
                  Sign in
                </Link>
              </li>
              <li className="ml-3">
                <Link className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm" href="/post-a-job">
                  Post a job - $299
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
