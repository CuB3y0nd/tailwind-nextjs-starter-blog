import Link from './Link'
import Image from './Image'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 mb-4">
        <Image
          alt="Written by Human, Not by AI"
          src="static/images/Written-By-Human-Not-By-AI-Badge-white.svg"
          width={120}
          height={50}
        />
        <Image
          alt="Written by Human, Not by AI"
          src="static/images/Written-By-Human-Not-By-AI-Badge-black.svg"
          width={120}
          height={50}
        />
      </div>
    </footer>
  )
}
