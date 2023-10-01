{/*
Note: This code includes an example of how to fetch data from an external JSON file that is hosted at https://raw.githubusercontent.com/cruip/cruip-dummy/main/job-board-posts.json. To facilitate this, we've included a lib directory in the root which contains a function that can fetch the JSON content. Additionally, we've defined the Post types in the types.d.ts file located in the root.
*/}

import getAllPosts from '@/lib/getAllPosts'
import PostItem from './post-item'
import Newsletter from '@/components/newsletter'

interface Post {
  id: number,
  sticky: boolean,
  title: string,
  name: string,
  image: string,
  tag1: string,
  tag2: string,
  date: string,  
}

export default async function PostsList() {
  const postsData: Promise<Post[]> = getAllPosts()
  const posts = await postsData

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* List container */}
      <div className="flex flex-col">

        {posts.map(post => {
          return (
            <PostItem key={post.id} {...post} />
          )
        })}



      </div>
    </div>
  )
}
