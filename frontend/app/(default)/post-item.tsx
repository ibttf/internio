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

  const tailwindColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
  };
  return (
    <div className={`group border-b ${!props.sticky && "border-gray-200"}`}>
      <div className="px-6 py-6 bg-indigo-100 hover:bg-indigo-200 transition duration-300 ease-in-out rounded-lg shadow-md relative">
        {/* Date in top right corner */}
        <div className="absolute top-3 right-3 text-sm text-gray-400">
          Posted: {props.date}
        </div>

        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            {props.image ? (
              <img
                src={props.image}
                width="64"
                height="64"
                alt={props.company}
                className="rounded-full border border-gray-200 shadow-sm"
              />
            ) : (
              <div
                className={`w-16 h-16 flex items-center justify-center text-white text-xl font-bold rounded-full ${getRandomColor()}`}
              >
                {props.company[0]}
              </div>
            )}
          </div>
          <div className="flex-grow space-y-4">
            {props.company_link ? (
              <Link
                className="text-xl font-semibold text-blue-600 hover:underline"
                href={`${props.company_link}`}
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
