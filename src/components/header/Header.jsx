// import React, { useState } from 'react'
// import { HiOutlineSearch } from "react-icons/hi";
// import { SlMenu } from "react-icons/sl";
// import { VscChromeClose } from "react-icons/vsc";
// import { useLocation, useNavigate } from 'react-router-dom';
// import logo from "../../assets/movix-logo.svg"
// import "./style.scss"




// const Header = () => {

//   const [show, setShow] = useState("top");
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [query, setQuery] = useState("");
//   const [showSearch, setShowSearch] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   return (
//     <div>Header</div>
//   )
// }

// export default Header

import React, { useState, useEffect } from "react";
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavbar = () => {
    const scrlY = window.scrollY
    // console.log(scrlY);
    if (scrlY > 200) {
      if (scrlY > lastScrollY && !mobileMenu) {
        setShow("hide")
      } else {
        setShow("show")
      }
      setShowSearch(false)
    } else {
      setShow("top")
    }
    // console.log(lastScrollY);
    setLastScrollY(scrlY)

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])




  // @for show and hide header when scrolling
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)

    return () => window.removeEventListener("scroll", controlNavbar)
  }, [lastScrollY])


  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie")
    } else {
      navigate("/explore/series")
    }
    setMobileMenu(false)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo"  onClick={() => navigate("/")} >
          <img src={logo} alt="Movix Logo"/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => { navigationHandler("movie") }}>Movies</li>
          <li className="menuItem" onClick={() => { navigationHandler("tv") }}>Series</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {/* if mobile manu is true show  (<VscChromeClose/>) <--Close else  (<SlMenu/>)<-- Hamburgar */}
          {mobileMenu ?
            (<VscChromeClose
              onClick={() => { setMobileMenu(false) }} />) :
            (<SlMenu
              onClick={openMobileMenu} />)}
        </div>
      </ContentWrapper>

      {/* SearchBar */}

      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for a movies or tv shows....'
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <VscChromeClose
              onClick={() => {
                setShowSearch(false)
              }} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
    // 2:36
  );
};

export default Header;