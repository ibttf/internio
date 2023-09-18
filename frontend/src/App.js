import {useState, useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {MdLocationOn} from "react-icons/md"
import {AiOutlineSearch} from "react-icons/ai"


function App() {
  const [navbar1Clicked,setNavbar1Clicked]=useState(false)
  const [navbar2Clicked,setNavbar2Clicked]=useState(false)
  const [navbar3Clicked,setNavbar3Clicked]=useState(false)



  return (
    <>
    <div className="App">
      <Navbar navbar1Clicked={navbar1Clicked} setNavbar1Clicked={setNavbar1Clicked} navbar2Clicked={navbar2Clicked} setNavbar2Clicked={setNavbar2Clicked} navbar3Clicked={navbar3Clicked} setNavbar3Clicked={setNavbar3Clicked} />
    </div>
    <div id="searchDiv" class="centerAll">
      <label class="searchBarText">I'm looking for</label><input type="text"></input>
      <label class="searchBarText">in<MdLocationOn></MdLocationOn></label><input type="text"></input>
      <label class="searchBarText">during</label><input type="text"></input>
      <AiOutlineSearch class="searchBarText icon"></AiOutlineSearch>
    </div>
    </>
  );
}

export default App;
