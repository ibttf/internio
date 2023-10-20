interface SidebarProps {
  handleFilterClear: () => void;
  remoteJob: boolean;
  setRemoteJob: React.Dispatch<React.SetStateAction<boolean>>;
  jobTypes: {
    internship: boolean;
    coop: boolean;
  };
  setJobTypes: React.Dispatch<
    React.SetStateAction<{
      internship: boolean;
      coop: boolean;
    }>
  >;
  jobRoles: {
    swe: boolean;
    datascience: boolean;
    research: boolean;
  };
  setJobRoles: React.Dispatch<
    React.SetStateAction<{
      swe: boolean;
      datascience: boolean;
      research: boolean;
    }>
  >;
  sponsorship: boolean;
  setSponsorship: React.Dispatch<React.SetStateAction<boolean>>;

  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  remoteJob,
  setRemoteJob,
  jobTypes,
  setJobTypes,
  jobRoles,
  setJobRoles,
  sponsorship,
  setSponsorship,
  location,
  setLocation,
  handleFilterClear,
}: SidebarProps) {
  return (
    <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
      <div
        data-sticky=""
        data-margin-top="32"
        data-sticky-for="768"
        data-sticky-wrap=""
      >
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          <div className="absolute top-5 right-5 leading-none">
            <button
              onClick={handleFilterClear}
              className="text-sm font-medium text-indigo-500 hover:underline"
            >
              Clear
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            {/* Job Type */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">
                Job Type
              </div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={jobTypes.internship}
                      onChange={() =>
                        setJobTypes((prev) => ({
                          ...prev,
                          internship: !prev.internship,
                        }))
                      }
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Internship
                    </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={jobTypes.coop}
                      onChange={() =>
                        setJobTypes((prev) => ({
                          ...prev,
                          coop: !prev.coop,
                        }))
                      }
                    />
                    <span className="text-sm text-gray-600 ml-2">Co-Op</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Job Roles */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">
                Job Roles
              </div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={jobRoles.swe}
                      onChange={() =>
                        setJobRoles((prev) => ({
                          ...prev,
                          swe: !prev.swe,
                        }))
                      }
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Software Engineering
                    </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={jobRoles.datascience}
                      onChange={() =>
                        setJobRoles((prev) => ({
                          ...prev,
                          datascience: !prev.datascience,
                        }))
                      }
                    />
                    <span className="text-sm text-gray-600 ml-2">
                      Data Science
                    </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={jobRoles.research}
                      onChange={() =>
                        setJobRoles((prev) => ({
                          ...prev,
                          research: !prev.research,
                        }))
                      }
                    />
                    <span className="text-sm text-gray-600 ml-2">Research</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Remote Only */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">
                Remote Only
              </div>
              <div className="flex items-center">
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="remote-toggle"
                    className="sr-only"
                    checked={remoteJob}
                    onChange={() => setRemoteJob(!remoteJob)}
                  />
                  <label className="bg-gray-300" htmlFor="remote-toggle">
                    <span className="bg-white shadow-sm" aria-hidden="true" />
                    <span className="sr-only">Remote Only</span>
                  </label>
                </div>
                <div className="text-sm text-gray-400 italic ml-2">
                  {remoteJob ? "On" : "Off"}
                </div>
              </div>
            </div>
            {/* Requires Sponsorship */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">
                Doesn't Require Sponsorship
              </div>
              <div className="flex items-center">
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="sponsorship-toggle"
                    className="sr-only"
                    checked={sponsorship}
                    onChange={() => setSponsorship(!sponsorship)}
                  />
                  <label className="bg-gray-300" htmlFor="sponsorship-toggle">
                    <span className="bg-white shadow-sm" aria-hidden="true" />
                    <span className="sr-only">Doesn't Require Sponsorship</span>
                  </label>
                </div>
                <div className="text-sm text-gray-400 italic ml-2">
                  {sponsorship ? "On" : "Off"}
                </div>
              </div>
            </div>
            {/* Location */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">
                Location
              </div>
              <label className="sr-only">Location</label>
              <select
                className="form-select w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
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
  );
}
