import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 1

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  draft?: boolean
  pinned?: boolean
}

interface PinnedProps {
  posts: Post[]
}

export default function Pinned({ posts }: PinnedProps) {
  return (
    <>
      <h3 className="font-bold text-2xl md:text-3xl tracking-tight my-4 text-text dark:text-text-dark flex gap-2">
        Pinned
      </h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && <li>No pinned posts</li>}
        {posts
          .slice(0, MAX_DISPLAY)
          .map((post) => (
            <li key={post.slug} className="py-4">
              <article key={post.slug}>
                <div className="flex flex-col h-full transform overflow-hidden rounded-md border-2 border-solid bg-transparent bg-opacity-20 dark:bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-surface0 dark:hover:bg-surface0-dark">
                  <div className="grow p-4 flex flex-col space-y-3">
                    <div className="space-y-4 grow">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold leading-8 tracking-tight">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {post.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="flex flex-wrap">
                        {post.tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <p className="prose text-md max-w-none text-gray-600 dark:text-gray-400">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row p-4 gap-2 text-sm">
                    <p>
                      <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
      </ul>
    </>
  )
}
