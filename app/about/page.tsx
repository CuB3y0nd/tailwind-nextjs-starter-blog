import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '关于我' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <p className="mb-5">
          如果您使用加密货币方式进行捐赠，请使用 <a className="special-link" href="/">主页</a> 上的任何方法与我联系，并提供您希望在捐赠列表中显示的用户名和头像。
        </p>
        <div className="flex items-center w-fit space-x-4 p-1 pl-2 pr-2 rounded-md border-2 border-solid bg-transparent bg-opacity-20 dark:bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md border-gray-300 dark:border-gray-700 hover:bg-surface0 dark:hover:bg-surface0-dark" style={{ borderColor: 'rgb(225, 125, 125)' }}>
          <svg className="svg-inline--fa fa-circle-exclamation flex-shrink-0 inline w-5 h-5 mr-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
          </svg>
          <span className="sr-only">Alert</span>
          <p>
            如果您使用加密货币捐赠，<strong>请确保将加密货币发送到与该货币对应的地址</strong>。发送到任何其它地址都有可能会导致货币丢失，造成无法恢复的损失！<br /><strong>对于这样的问题我不会承担任何责任。</strong>
          </p>
        </div>
      </AuthorLayout>
    </>
  )
}
