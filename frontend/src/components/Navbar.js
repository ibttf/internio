import React from 'react';
import { Link } from 'react-router-dom';
import {PiBracketsCurlyBold} from "react-icons/pi"
const Navbar = () => {
    return (
        <div className="relative top-0 w-screen px-24 py-12 flex justify-between">
            <Link to="/" className="cursor-pointer">
                <PiBracketsCurlyBold className="w-10 h-10 " />
            </Link>
            <div >
                <Link to="/" className="font-bold mx-4 text-lg cursor-pointer hover:underline duration-100 ">
                    Home
                </Link>
                <Link to="/postings" className="font-bold mx-4 text-lg cursor-pointer hover:underline duration-100">
                    Postings
                </Link>
            </div>
            
        </div>
    );
}

export default Navbar;
