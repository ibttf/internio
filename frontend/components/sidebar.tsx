'use client'

import { useState } from 'react'

export default function Sidebar() {

  const [remoteJob, setRemoteJob] = useState<boolean>(false);

  // Job Type
  const [jobTypes, setJobTypes] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    contract: false,
    coFounder: false
  });

  // Job Roles
  const [jobRoles, setJobRoles] = useState({
    programming: true,  // set to true because it's defaultChecked in your code
    design: false,
    managementFinance: false,
    customerSupport: false,
    salesMarketing: false
  });

  // Salary Range
  const [salaryRanges, setSalaryRanges] = useState({
    range1: false,
    range2: false,
    range3: false,
    drawing: false
  });

  // Location
  const [location, setLocation] = useState('Anywhere');

  const handleFilterClear = () => {
    setJobTypes({
      fullTime: false,
      partTime: false,
      internship: false,
      contract: false,
      coFounder: false
    });
    setJobRoles({
      programming: false,
      design: false,
      managementFinance: false,
      customerSupport: false,
      salesMarketing: false
    });
    setSalaryRanges({
      range1: false,
      range2: false,
      range3: false,
      drawing: false
    });
    setLocation('Anywhere');
    setRemoteJob(false);
  }




  return (
    <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
      <div data-sticky="" data-margin-top="32" data-sticky-for="768" data-sticky-wrap="">
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          <div className="absolute top-5 right-5 leading-none">
            <button onClick={handleFilterClear} className="text-sm font-medium text-indigo-500 hover:underline">Clear</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            {/* Job Type */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Job Type</div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobTypes.fullTime} onChange={() => setJobTypes(prev => ({ ...prev, fullTime: !prev.fullTime }))} />
                    <span className="text-sm text-gray-600 ml-2">Full-time</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobTypes.partTime} onChange={() => setJobTypes(prev => ({ ...prev, partTime: !prev.partTime }))} />
                    <span className="text-sm text-gray-600 ml-2">Part-time</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobTypes.internship} onChange={() => setJobTypes(prev => ({ ...prev, internship: !prev.internship }))} />
                    <span className="text-sm text-gray-600 ml-2">Internship</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobTypes.contract} onChange={() => setJobTypes(prev => ({ ...prev, contract: !prev.contract }))} />
                    <span className="text-sm text-gray-600 ml-2">Contract / Freelance</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobTypes.coFounder} onChange={() => setJobTypes(prev => ({ ...prev, coFounder: !prev.coFounder }))} />
                    <span className="text-sm text-gray-600 ml-2">Co-founder</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Job Roles */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Job Roles</div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobRoles.programming} onChange={() => setJobRoles(prev => ({ ...prev, programming: !prev.programming }))} />
                    <span className="text-sm text-gray-600 ml-2">Programming</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobRoles.design} onChange={() => setJobRoles(prev => ({ ...prev, design: !prev.design }))} />
                    <span className="text-sm text-gray-600 ml-2">Design</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobRoles.managementFinance} onChange={() => setJobRoles(prev => ({ ...prev, managementFinance: !prev.managementFinance }))} />
                    <span className="text-sm text-gray-600 ml-2">Management / Finance</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobRoles.customerSupport} onChange={() => setJobRoles(prev => ({ ...prev, customerSupport: !prev.customerSupport }))} />
                    <span className="text-sm text-gray-600 ml-2">Customer Support</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={jobRoles.salesMarketing} onChange={() => setJobRoles(prev => ({ ...prev, salesMarketing: !prev.salesMarketing }))} />
                    <span className="text-sm text-gray-600 ml-2">Sales / Marketing</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Remote Only */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Remote Only</div>
              <div className="flex items-center">
                <div className="form-switch">
                  <input type="checkbox" id="remote-toggle" className="sr-only" checked={remoteJob} onChange={() => setRemoteJob(!remoteJob)} />
                  <label className="bg-gray-300" htmlFor="remote-toggle">
                    <span className="bg-white shadow-sm" aria-hidden="true" />
                    <span className="sr-only">Remote Only</span>
                  </label>
                </div>
                <div className="text-sm text-gray-400 italic ml-2">{remoteJob ? 'On' : 'Off'}</div>
              </div>
            </div>
            {/* Salary Range */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Salary Range</div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={salaryRanges.range1} onChange={() => setSalaryRanges(prev => ({ ...prev, range1: !prev.range1 }))} />
                    <span className="text-sm text-gray-600 ml-2">$20K - $50K</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={salaryRanges.range2} onChange={() => setSalaryRanges(prev => ({ ...prev, range2: !prev.range2 }))} />
                    <span className="text-sm text-gray-600 ml-2">$50K - $100K</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={salaryRanges.range3} onChange={() => setSalaryRanges(prev => ({ ...prev, range3: !prev.range3 }))} />
                    <span className="text-sm text-gray-600 ml-2">&gt; $100K</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" checked={salaryRanges.drawing} onChange={() => setSalaryRanges(prev => ({ ...prev, drawing: !prev.drawing }))} />
                    <span className="text-sm text-gray-600 ml-2">Drawing / Painting</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Location */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Location</div>
              <label className="sr-only">Location</label>
              <select className="form-select w-full" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option>Anywhere</option>
                <option>London</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>Berlin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}