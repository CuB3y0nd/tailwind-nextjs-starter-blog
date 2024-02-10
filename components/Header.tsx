import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-base/50 dark:bg-base-dark/50 saturate-100 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-8">
        <div>
          <a aria-label="CuB3y0nd" href="/">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between mr-3">
                <img className="rounded-md" alt="CuB3y0nd's Avatar" loading="lazy" width="45" height="45" decoding="async" data-nimg="1" style={{ color: 'transparent', border: '2px solid #7c7f93' }} src="/static/images/avatar.png" />
                <div className="h-[35px]">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium ml-2 mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Focusing</span>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="flex items-center text-base dark:text-base-dark leading-5">
          <div className="hidden sm:block">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded py-1 px-2 text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark sm:py-2 sm:px-3"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <div className="flex items-center space-x-2">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
