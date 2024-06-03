import Link from "next/link";
import { FaLock, FaCheckCircle } from "react-icons/fa";
export default function PostItem({ ...props }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Internship":
        return "bg-red-300";
      case "Co-op":
        return "bg-blue-300";
      case "Machine Learning":
        return "bg-green-300";
      case "Software Engineering":
        return "bg-yellow-300";
      case "Data Science":
        return "bg-purple-300";
      case "Research":
        return "bg-orange-300";
      default:
        return "bg-gray-300";
    }
  };
  const charToBackgroundColor = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    D: "bg-green-500",
    E: "bg-indigo-500",
    F: "bg-purple-500",
    G: "bg-red-500",
    H: "bg-blue-500",
    I: "bg-yellow-500",
    J: "bg-green-500",
    K: "bg-indigo-500",
    L: "bg-purple-500",
    M: "bg-red-500",
    N: "bg-blue-500",
    O: "bg-yellow-500",
    P: "bg-green-500",
    Q: "bg-indigo-500",
    R: "bg-purple-500",
    S: "bg-red-500",
    T: "bg-blue-500",
    U: "bg-yellow-500",
    V: "bg-green-500",
    W: "bg-indigo-500",
    X: "bg-purple-500",
    Y: "bg-red-500",
    Z: "bg-blue-500",
  };
  const getRandomColor = (companyName: string): string => {
    const firstChar = companyName.charAt(0).toUpperCase();
    return (
      (charToBackgroundColor as Record<string, string>)[firstChar] ||
      "bg-gray-500"
    );
  };
  return (
    <div className={`group border-b ${!props.sticky && "border-gray-200"}`}>
      <div className="px-4 md:px-6 py-4 md:py-6 bg-indigo-100 hover:bg-indigo-200 transition duration-300 ease-in-out rounded-lg shadow-md relative">
        <div className="absolute top-3 right-3 text-sm text-gray-400">
          Posted: {props.date}
        </div>

        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            {props.company_logo ? (
              <img
                src={props.company_logo}
                width="64"
                height="64"
                alt={props.company}
                className="rounded-full border border-gray-200 shadow-sm"
              />
            ) : (
              <div
                className={`w-16 h-16 flex items-center justify-center text-white text-xl font-bold rounded-full ${getRandomColor(
                  props.company[0]
                )}`}
              >
                {props.company[0]}
              </div>
            )}
          </div>
          <div className="flex-grow space-y-4">
            {props.company_link ? (
              <Link
                className="text-xl font-semibold text-blue-600 hover:underline"
                href={
                  props.company_link.startsWith("http")
                    ? props.company_link
                    : `http://${props.company_link}`
                }
              >
                {props.company}
              </Link>
            ) : (
              <div className="text-xl font-semibold text-gray-800">
                {props.company}
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="text-gray-500">{props.title}</div>
            </div>
            <div className="flex flex-wrap items-center space-x-2 mt-2 space-y-2">
              {/* Location as a colorful box */}
              {props.locations ? (
                props.locations.map((location: string, index: number) => (
                  <span
                    key={index}
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      location === "Remote"
                        ? "bg-gray-800 text-gray-50"
                        : "bg-blue-200 text-blue-700"
                    }`}
                  >
                    {location}
                  </span>
                ))
              ) : (
                <></>
              )}
              {props.categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className={`text-xs font-semibold px-2 py-0.5 bg-gray-100 rounded-full ${getCategoryColor(
                    category
                  )}`}
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2 opacity-70">
              {/* Sponsorship */}
              {props.sponsorship ? (
                <div className="flex items-center text-sm text-green-600">
                  <FaCheckCircle size={16} className="mr-2" />
                  <span>Doesn't require sponsorship</span>
                </div>
              ) : (
                <div className="flex items-center text-sm text-red-600">
                  <FaLock size={16} className="mr-2" />
                  <span>Requires sponsorship</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            {props.closed ? (
              <div className="flex items-center text-white bg-yellow-600 px-3 py-1.5 rounded-full">
                <FaLock size={12} className="mr-2" />
                <span>Closed</span>
              </div>
            ) : (
              <Link
                className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-full transition duration-150"
                href={`${props.apply_link}`}
              >
                Apply
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
