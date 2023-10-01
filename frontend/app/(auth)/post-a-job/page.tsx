import Image from 'next/image'
import UploadImage from '@/public/images/upload.jpg'
import AddOns from './add-ons'

export const metadata = {
  title: 'Post a Job - JobBoard',
  description: 'Page description',
}

export default function PostAJob() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold font-inter mb-2">Post a job on JobBoard</h1>
        <div className="text-gray-500">Find the best talent from around the world on the most exclusive job board on the internet.</div>
      </div>

      {/* Form */}
      <form className="mb-12">
        <div className="divide-y divide-gray-200 -my-6">
          {/* Group #1 */}
          <div className="py-6">
            <div className="text-lg font-bold text-gray-800 mb-5">
              <span className="text-indigo-500">1.</span> Your company
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input id="name" className="form-input w-full" type="text" required placeholder="E.g., Acme Inc." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input id="email" className="form-input w-full" type="email" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="file">
                  Company Logo <span className="text-gray-500">(optional)</span>
                </label>
                <div className="flex items-center">
                  <div className="shrink-0 mr-4">
                    <Image className="object-cover w-16 h-16 rounded-full border border-gray-200" src={UploadImage} alt="Upload" />
                  </div>
                  <div>
                    <input
                      id="file"
                      type="file"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group #2 */}
          <div className="py-6">
            <div className="text-lg font-bold text-gray-800 mb-5">
              <span className="text-indigo-500">2.</span> The role
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="position">
                  Position Name <span className="text-red-500">*</span>
                </label>
                <input id="position" className="form-input w-full" type="text" required placeholder="E.g., Senior Software Engineer" />
              </div>
              <div>
                <label className="block text-sm text-gray-800 font-medium mb-1" htmlFor="role">
                  Role <span className="text-rose-500">*</span>
                </label>
                <select id="role" className="form-select text-sm py-2 w-full" required>
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Management / Finance</option>
                  <option>Customer Support</option>
                  <option>Sales / Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-800 font-medium mb-1" htmlFor="commitment">
                  Commitment <span className="text-rose-500">*</span>
                </label>
                <select id="commitment" className="form-select text-sm py-2 w-full" required>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Intership</option>
                  <option>Contract / Freelance</option>
                  <option>Co-founder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-800 font-medium mb-1" htmlFor="description">
                  Job Description <span className="text-rose-500">*</span>
                </label>
                <textarea id="description" className="form-textarea text-sm py-2 w-full" rows={4} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="salary">
                  Salary <span className="text-gray-500">(optional)</span>
                </label>
                <input id="salary" className="form-input w-full" type="text" />
                <div className="text-xs text-gray-500 italic mt-2">Example: “$100,000 - $170,000 USD”</div>
              </div>
            </div>
          </div>

          {/* Group #3 */}
          <AddOns />
        </div>
      </form>
    </>
  )
}
