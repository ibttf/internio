{/*
Note: This code includes an example of how to fetch data from an external JSON file that is hosted at https://raw.githubusercontent.com/cruip/cruip-dummy/main/job-board-posts.json. To facilitate this, we've included a lib directory in the root which contains a function that can fetch the JSON content. Additionally, we've defined the Post types in the types.d.ts file located in the root.
*/}

import getAllPosts from '@/lib/getAllPosts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PostItem from '../../post-item'
import Newsletter from '@/components/newsletter'

export async function generateStaticParams() {
  const postsData: Promise<Post[]> = getAllPosts()
  const posts = await postsData

  return posts.map(post => ({
    id: post.id.toString()
  }))
}

export async function generateMetadata({ params }: {
  params: { id: number }
}): Promise<Metadata> {
  const postsData: Promise<Post[]> = getAllPosts()
  const posts = await postsData
  const post = posts.find((post) => post.id === Number(params.id))

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }  

  return {
    title: post.title,
    description: 'Page description',
  }

}

export default async function SinglePost({ params }: {
  params: { id: number }
}) {

  const postsData: Promise<Post[]> = getAllPosts()
  const posts = await postsData
  const post = posts.find((post) => post.id === Number(params.id))

  if (!post) {
    notFound()
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-8 md:pt-36 md:pb-16">
          <div className="md:flex md:justify-between" data-sticky-container>
            {/* Sidebar */}
            <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
              <div data-sticky data-margin-top="32" data-sticky-for="768" data-sticky-wrap>
                <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="text-center mb-6">
                    <Image className="inline-flex mb-2" src={post.image} width={72} height={72} alt={post.name} />
                    <h2 className="text-lg font-bold text-gray-800">{post.name}</h2>
                  </div>

                  <div className="flex justify-center md:justify-start mb-5">
                    <ul className="inline-flex flex-col space-y-2">
                      <li className="flex items-center">
                        <svg className="shrink-0 fill-gray-400 mr-3" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.707 4.293a1 1 0 0 0-1.414 1.414L10.586 8H2V2h3a1 1 0 1 0 0-2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z" />
                        </svg>
                        <span className="text-sm text-gray-600">{post.date}</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="shrink-0 fill-gray-400 mr-3" width="14" height="16" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="7" cy="7" r="2" />
                          <path d="M6.3 15.7c-.1-.1-4.2-3.7-4.2-3.8C.7 10.7 0 8.9 0 7c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-.7 3.7-2.1 5-.1.1-4.1 3.7-4.2 3.8-.4.3-1 .3-1.4-.1Zm-2.7-5 3.4 3 3.4-3c1-1 1.6-2.2 1.6-3.6 0-2.8-2.2-5-5-5S2 4.2 2 7c0 1.4.6 2.7 1.6 3.7 0-.1 0-.1 0 0Z" />
                        </svg>
                        <span className="text-sm text-gray-600">{post.tag2}</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="shrink-0 fill-gray-400 mr-3" width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 0H1C.4 0 0 .4 0 1v10c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm-1 10H2V2h12v8Z" />
                          <circle cx="8" cy="6" r="2" />
                        </svg>
                        <span className="text-sm text-gray-600">{post.tag1}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="max-w-xs mx-auto mb-5">
                    <a className="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 group shadow-sm" href="#0">
                      Apply Now{' '}
                      <span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                        -&gt;
                      </span>
                    </a>
                  </div>

                  <div className="text-center">
                    <a className="text-sm text-indigo-500 font-medium hover:underline" href="#0">
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="md:grow">
              {/* Job description */}
              <div className="pb-8">
                <div className="mb-4">
                  <Link className="text-indigo-500 font-medium" href="/">
                    <span className="tracking-normal">&lt;-</span> All Jobs
                  </Link>
                </div>
                <h1 className="text-4xl font-extrabold font-inter mb-10">{post.title}</h1>
                {/* Job description */}
                <div className="space-y-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">The Role</h3>
                    <div className="text-gray-500 space-y-3">
                      <p>In the world of AI, behavioural predictions are leading the charge to better machine learning.</p>
                      <p>
                        There is so much happening in the AI space. Advances in the economic sectors have seen automated business practices
                        rapidly increasing economic value. While the realm of the human sciences has used the power afforded by computational
                        capabilities to solve many human based dilemmas. Even the art scene has adopted carefully selected ML applications to
                        usher in the technological movement.
                      </p>
                      <p>
                        As a Senior Client Engineer, you'll work alongside other engineers, designers, and product managers to tackle everything
                        from huge company initiatives to modest but important bug fixes, from start to finish. You'll also collaborate with your
                        product team on discovery, helping to assess the direction and feasibility of product changes. And, perhaps most
                        importantly, you'll actively contribute to the evolution of the culture and processes of a growing engineering team.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">About You</h3>
                    <div className="text-gray-500 space-y-3">
                      <p>
                        You love building great software. Your work could be supporting new feature development, migrating existing features, and
                        creating other mobile and web solutions for customers. You'll have a primary focus on frontend development using
                        Javascript. Our client's tech stack is JavaScript, primarily using React. A strong understanding of JS core (ES2019+) is
                        required, with some exposure in Java as back-end technology. We use modern tools, which means you'll have the opportunity
                        to work with Webpack, Redux, Apollo, Styled Components, and much more.
                      </p>
                      <p>
                        You love learning. Engineering is an ever-evolving world. You enjoy playing with new tech and exploring areas that you
                        might not have experience with yet. You are self-driven, self-learner willing to share knowledge and participate actively
                        in your community.
                      </p>
                      <p>
                        Having overlap with your team is critical when working in a global remote team. Modus requires all team members to overlap
                        with EST morning hours daily. In addition, reliable high speed internet is a must.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Things You Might Do</h3>
                    <div className="text-gray-500 space-y-3">
                      <p>
                        We are a fast-growing, and remote-first company, so you'll likely get experience on many different projects across the
                        organization. That said, here are some things you'll probably do:
                      </p>
                      <ul className="list-disc list-inside space-y-3">
                        <li>Give back to the community via open source and blog posts</li>
                        <li>
                          Travel and meet great people- as part of our remote-first lifestyle, it's important that we come together as needed to
                          work together, meet each other in person and have fun together. Please keep that in mind when you apply
                        </li>
                        <li>
                          Teach and be taught: Modus creates active teams that work in internal and external projects together, giving
                          opportunities to stay relevant with the latest technologies and learning from experts worldwide
                        </li>
                        <li>Interact directly with internal and external clients to represent Modus and its values</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Social share */}
                <div className="flex items-center justify-end space-x-4">
                  <div className="text-xl font-nycd text-gray-400">Share job</div>
                  <ul className="inline-flex space-x-3">
                    <li>
                      <a
                        className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                        href="#0"
                        aria-label="Twitter"
                      >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                        href="#0"
                        aria-label="Facebook"
                      >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                        href="#0"
                        aria-label="Telegram"
                      >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.968 10.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045s-14.019 5.038-14.82 5.596c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622s2.561-10.275 2.646-11.658c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Related jobs */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold font-inter mb-8">Related Jobs</h4>
                {/* List container */}
                <div className="flex flex-col border-t border-gray-200">
                  {posts.slice(1,4).map(post => {
                    return (
                      <PostItem key={post.id} {...post} />
                    )
                  })}
                </div>
              </div>

              <div>
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}