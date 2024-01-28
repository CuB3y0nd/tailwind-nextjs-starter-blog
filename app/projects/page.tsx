import projectsData from '@/data/projectsData'
import ProjectCard from '@/components/ProjectCard'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '项目' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-20">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            项目
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            我的开源项目列表
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            <del>被你发现了！这是一个被鸽了的页面 qwq ……</del> 有空一定填坑！
          </p>
        </div>
        <div className="container py-12">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {projectsData.map((d) => (
              <ProjectCard
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
