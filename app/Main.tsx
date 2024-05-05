import Link from '@/components/Link'
import Tag from '@/components/Tag'
import NavidromeNowPlaying from '@/components/NavidromeNowPlaying'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Pinned from '@/components/Pinned'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 4

const sortedPosts = sortPosts(allBlogs)
const posts = allCoreContent(sortedPosts)
const pinnedPosts = posts.filter((post) => post.pinned)

export default function Home({ posts }) {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pt-20 sm:px-6 xl:max-w-4xl xl:px-0">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="dark:text-text-dark mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl">
            CuB3y0nd
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          {pinnedPosts.length > 0 && <Pinned posts={pinnedPosts} />}
          <h3 className="dark:text-text-dark my-4 flex gap-2 text-2xl font-bold tracking-tight text-text md:text-3xl">
            My Writings
          </h3>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article key={slug}>
                <div className="dark:hover:bg-surface0-dark flex h-full transform flex-col overflow-hidden rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md hover:border-primary-500 hover:bg-surface0 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-primary-500">
                  <div className="flex grow flex-col space-y-3 p-4">
                    <div className="grow space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h3>
                      </div>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <p className="text-md prose max-w-none text-gray-600 dark:text-gray-400">
                        {summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 p-4 text-sm">
                    <p>
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            更多文章 &rarr;
          </Link>
        </div>
      )}
      <NavidromeNowPlaying />
    </>
  )
}
