import React from 'react';
import {GiSlowBlob} from "react-icons/gi"
const Home = () => {
    return (
        <div className="px-24 py-12">
            <div className="grid grid-cols-7 w-fit mx-auto">
                <div className='w-full  col-span-4'>
                    <h1 className="text-8xl font-bold">

                        Your tech search starts here.
                    </h1>
                    <h2 className="text-xl text-gray-500 my-12 mr-24">
                    Find quality internship & new grad postings fast and stay up to date with the latest openings.
                    </h2>
                </div>
                <div className="w-2 h-96 bg-black"></div>
                <div className="w-full col-span-2">
                    <ul className="flex flex-col space-y-2 w-full h-full justify-center ">
                        <li className="text-3xl font-bold flex flex-col items-left space-y-2">
                            <span className="flex items-center mr-2"><GiSlowBlob className="w-6 h-6"/> 364</span>
                            <span className="text-lg text-gray-600">Companies</span>
                        </li>
                        <li className="text-3xl font-bold flex flex-col items-left space-y-2">
                            <span className="flex items-center mr-2"><GiSlowBlob className="w-6 h-6"/> 364</span>
                            <span className="text-lg text-gray-600">Companies</span>
                        </li>
                        <li className="text-3xl font-bold flex flex-col items-left space-y-2">
                            <span className="flex items-center mr-2"><GiSlowBlob className="w-6 h-6"/> 364</span>
                            <span className="text-lg text-gray-600">Companies</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Home;
