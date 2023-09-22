import React from 'react';

const CodeComponent = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-md text-gray-900 shadow-md border border-gray-300">
      
      {/* Emulating VSCode tab and codebar */}
      <div className="bg-gray-200 px-3 py-1 rounded-t-md flex justify-between items-center mb-6 border-b">
        <div className="flex space-x-3">
          <span className="text-lg bg-blue-500 text-white rounded px-2 py-1">search.py</span>
        </div>

        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-red-500 rounded-full block"></span>
          <span className="w-4 h-4 bg-yellow-500 rounded-full block"></span>
          <span className="w-4 h-4 bg-green-500 rounded-full block"></span>
        </div>
      </div>


      <div className="space-y-5 text-xl px-6 py-4 bg-white rounded-md"> {/* Adjusted text size and added a background */}
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4">1</span>
          <span className="text-green-600">import</span>
          <span className="ml-3 text-blue-600">re</span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4">2</span>
          re.search(
          <input 
            className="mx-2 bg-gray-100 border border-gray-300 rounded px-3 text-gray-700" 
            type="text" 
            placeholder="type here..." 
          />, db)
        </div>

        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4">3</span>
          db.sort(
          <select className="mx-2 bg-gray-100 border border-gray-300 rounded text-gray-700 px-3 py-1">
            <option value="postings/sort/date_posted:desc">most recent</option>
            <option value="postings/sort/yearly_salary:desc">highest pay</option>
          </select>)
        </div>

        <div className="flex items-start">
          <span className="text-gray-400 text-sm mr-4 mt-1">4</span>
          db.filter(
          <div className="ml-3 flex bg-gray-100 p-2 rounded border border-gray-300">
            <label className="flex items-center mr-4">
              <input type="checkbox" className="form-checkbox text-blue-600 bg-white border-gray-300 mr-2" />
              <span>internship</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600 bg-white border-gray-300 mr-2" />
              <span>new_grad</span>
            </label>
          </div>)
        </div>
      </div>
    </div>
  );
}

export default CodeComponent;
