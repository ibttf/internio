import Link from "next/link";
import { FaLock } from "react-icons/fa";
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
    <div
      className={`[&:nth-child(-n+12)]:-order-1 group ${
        !props.sticky && "border-b border-gray-200"
      }`}
    >
      <div className={`px-4 py-6 ${"bg-indigo-100 rounded-xl"}`}>
        <div className="sm:flex items-center space-y-3 sm:space-y-0 sm:space-x-5">
          <div className="shrink-0">
            {props.image ? (
              <img
                src={props.image}
                width="56"
                height="56"
                alt={props.company}
              />
            ) : (
              <div
                className={`w-14 h-14 flex items-center justify-center text-white text-xl font-bold rounded-full ${getRandomColor()}`}
              >
                {props.company[0]}
              </div>
            )}
          </div>
          <div className="grow lg:flex items-center justify-between space-y-5 lg:space-x-2 lg:space-y-0">
            <div>
              <div className="flex datas-start space-x-2">
                <div className="text-sm text-gray-800 font-semibold mb-1">
                  {props.title}
                </div>
              </div>
              <div className="mb-2">
                {props.company_link ? (
                  <Link
                    className="text-lg font-bold text-blue-600 underline hover:cursor-pointer"
                    href={`${props.company_link}`}
                  >
                    {props.company}
                  </Link>
                ) : (
                  <div className="text-lg text-gray-800 font-bold">
                    {props.company}
                  </div>
                )}
              </div>
              <div className="-m-1 flex flex-wrap">
                {props.categories.forEach((category: any) => {
                  console.log(category);
                })}
                {props.categories.map((category: string, index: number) => {
                  return (
                    <span
                      key={index}
                      className={`text-xs font-medium inline-flex px-2 py-0.5 rounded-md m-1 whitespace-nowrap transition duration-150 ease-in-out ${
                        props.sticky
                          ? "bg-indigo-50"
                          : getCategoryColor(category)
                      }`}
                    >
                      {category}
                    </span>
                  );
                })}
              </div>
              <div>
                {props.sponsorship ? (
                  <div>requires sponsorship</div>
                ) : (
                  <div> doesn't require sponsorship</div>
                )}
              </div>
            </div>
            <div className="min-w-[120px] flex items-center lg:justify-end space-x-3 lg:space-x-0">
              <div className="">
                {props.closed ? (
                  <div className="flex items-center text-white space-x-1 bg-yellow-600 py-1.5 px-3 rounded-full btn-sm">
                    <FaLock size={12} />
                    <span>Closed</span>
                  </div>
                ) : (
                  <Link
                    className="btn-sm py-1.5 px-3 text-white bg-indigo-500 hover:bg-indigo-600 group shadow-sm"
                    href={`${props.apply_link}`}
                  >
                    Apply
                    <span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </Link>
                )}
              </div>
              {/* <div className="group-hover:lg:hidden text-sm italic text-gray-500">
                {props.date}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
