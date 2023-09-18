import React, {useState} from "react"
import {FaSuitcase} from "react-icons/fa"

function Navbar(props){
    function handleNavbarClick(){
        return
    }


    return(
        <nav className="navbar-container">
            <div id="topBar">
                <FaSuitcase class="suitcase"></FaSuitcase>
                <h1>internIo</h1>
            </div>
            <div id="navBar">
                <ul>
                    <li class="dropdown" onClick={()=>handleNavbarClick()}>
                        <a class="dropbtn">Home</a>
                        <div class="dropdown-content">
                            <a>Navbar Item 1</a>
                            <a>Navbar Item 2</a>
		                </div>
                    </li>
                    <li>
                        <a class="dropbtn">Internships</a>
                    </li>
                    <li>
                        <a class="dropbtn">About</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar