import Link from 'next/link'
import {PiBracketsAngleBold} from "react-icons/pi"

export default function HeaderLogo() {
  return (
    <Link href="/" aria-label="Cruip" className="flex items-center">
      <PiBracketsAngleBold size={40}/>
      <p className="ml-2 font-bold text-3xl">
        Internio
      </p>
    </Link>
  )
}
