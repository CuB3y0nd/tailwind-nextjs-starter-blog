import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="dark:bg-base-dark/50 fixed left-0 right-0 top-0 z-40 bg-base/50 saturate-100 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-8">
        <div>
          <a aria-label="CuB3y0nd" href="/">
            <div className="flex items-center justify-between">
              <div className="mr-3 flex items-center justify-between">
                <img
                  className="rounded-md"
                  alt="CuB3y0nd's Avatar"
                  loading="lazy"
                  width="45"
                  height="45"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: 'transparent', border: '2px solid #7c7f93' }}
                  src="/static/images/avatar.png"
                />
                <div className="h-[25px]">
                  <span className="ml-2 mr-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    Focusing
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="dark:text-base-dark flex items-center space-x-2 text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="dark:text-text-dark dark:hover:bg-surface0-dark rounded px-2 py-1 text-text hover:bg-surface0 sm:px-3 sm:py-2"
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
