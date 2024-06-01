import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import MicIcon from "@mui/icons-material/Mic";
import AlbumIcon from "@mui/icons-material/Album";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RecommendIcon from "@mui/icons-material/Recommend";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../pages/dashboard.css";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu, } from "react-pro-sidebar";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';


const Sidenavbar = () => {
  const [activePage, setActivePage] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    console.log("location", location.pathname);

    setActivePage(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarExpanded(window.innerWidth > 480);
    };


  const handleTopArtistClick = () => {
    setActivePage('/topartist')
    navigate("/topartist");
  }
  const handleAroundYouClick = () => {
    setActivePage('/aroundyou');
    navigate("/aroundyou");
  }
  const handleTopChartsClick = () => {
    setActivePage('/topcharts');
    navigate("/topcharts");
  }
  const handleRecommendationClick = () => {
    setActivePage('/recommendation');
    navigate("/recommendation");
  }
  const handleFavoriteClick = () => {
    setActivePage('/favorite');
    navigate("/favorite");
  }
  const handleSignOut = () => {
    setActivePage('/');
    navigate("/");

  };
  const { collapseSidebar } = useProSidebar();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
    if (window.innerWidth <= 480) {
      setIsSidebarExpanded(false);
    }
  };


  const handleSubMenuClose = () => {
    setIsSubMenuOpen(false);
  };
  const handleAccountClick = () => {
    setActivePage('/account');
    navigate("/account");
  }
  return (
    <Sidebar
      backgroundColor="rgb(24,24,29)"
      rtl={false}
      style={{ height: "100vh" }}
    >
      <Menu
        renderMenuItemStyles={() => ({
          ".menu-anchor": {
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "green",
            },
          },
        })}
      >
        <MenuItem
          className="item"
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ backgroundColor: "rgb(24,24,29)" }}
        >
          <div className="logo-container">
            <img
              className="logo"
              src="./assets/note-removebg.png"
              alt="Music"
            />
            <h2>Vibz</h2>
          </div>
        </MenuItem>
        <SubMenu
          label="Menu"
          style={{
            backgroundColor: isSubMenuOpen ? "white" : "transparent",
            color: isSubMenuOpen ? "black" : "white",
          }}
          onOpen={handleSubMenuOpen}
          onClose={handleSubMenuClose}
        >
          <MenuItem
            style={{
              backgroundColor: activePage === '/dashboard' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/dashboard' ? "rgb(24,24,29)" : "white",
            }}
            icon={<ExploreIcon />}
            className="submenu-item"
            onClick={handleDiscoverClick}
          >
            Discover
          </MenuItem>
          <MenuItem
            style={{
              backgroundColor: activePage === '/aroundyou' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/aroundyou' ? "rgb(24,24,29)" : "white",
            }}
            icon={<PeopleOutlinedIcon />}
            className="submenu-item"
            onClick={handleAroundYouClick}
          >
            Around You
          </MenuItem>

          <MenuItem
            style={{
              backgroundColor: activePage === '/topartist' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/topartist' ? "rgb(24,24,29)" : "white",
            }}
            icon={<MicIcon />}
            className="submenu-item"
            onClick={handleTopArtistClick}
          >
            Top Artist
          </MenuItem>

          <MenuItem
            style={{
              backgroundColor: activePage === '/topcharts' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/topcharts' ? "rgb(24,24,29)" : "white",
            }}
            icon={<AlbumIcon />}
            className="submenu-item"
            onClick={handleTopChartsClick}
          >
            Top Charts
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Library"
          style={{
            backgroundColor: isSubMenuOpen ? "white" : "transparent",
            color: isSubMenuOpen ? "black" : "white",
          }}
          onOpen={handleSubMenuOpen}
          onClose={handleSubMenuClose}
        >
          <MenuItem
            style={{
              backgroundColor: activePage === '/favorite' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/favorite' ? "rgb(24,24,29)" : "white",
            }}
            icon={<FavoriteIcon />}
            className="submenu-item"
            onClick={handleFavoriteClick}
          >
            Favorites
          </MenuItem>
          <MenuItem
            style={{
              backgroundColor: activePage === '/account' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/account' ? "rgb(24,24,29)" : "white",
            }}
            icon={<AccountCircleIcon />}
            className="submenu-item"
            onClick={handleAccountClick}
          >
            Account
          </MenuItem>
          <MenuItem
            style={{
              backgroundColor: activePage === '/recommendation' ? "lightgray" : "rgb(24,24,29)",
              color: activePage === '/recommendation' ? "rgb(24,24,29)" : "white",
            }}
            icon={<RecommendIcon />}
            className="submenu-item"
            onClick={handleRecommendationClick}
          >
            Recommendation
          </MenuItem>
        </SubMenu>
      </Menu>

      <button
        type="button"
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        onClick={handleSignOut}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Sign Out
        </span>
      </button>
    </Sidebar>
  )
}
  return (
    <>
      <Sidebar
        className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}
        backgroundColor="rgb(24,24,29)"
        rtl={false}
        collapsed={window.innerWidth <= 480}
      >
        <Menu>
            <div className="logo-container">
              <img src='./assets/note-removebg.png' alt='logo' className='dash-logo'/>
              <h2 className='nav-head-ing'>Vibz</h2>
            </div>
          <SubMenu
            label="Menu"
            icon={<MenuOutlinedIcon />}
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <MenuItem
              style={{
                backgroundColor: activePage === '/dashboard' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/dashboard' ? "rgb(24,24,29)" : "white",
              }}
              icon={<ExploreIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/dashboard')}
            >
              Discover
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: activePage === '/aroundyou' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/aroundyou' ? "rgb(24,24,29)" : "white",
              }}
              icon={<PeopleOutlinedIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/aroundyou')}
            >
              Around You
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: activePage === '/topartist' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/topartist' ? "rgb(24,24,29)" : "white",
              }}
              icon={<MicIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/topartist')}
            >
              Top Artist
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: activePage === '/topcharts' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/topcharts' ? "rgb(24,24,29)" : "white",
              }}
              icon={<AlbumIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/topcharts')}
            >
              Top Charts
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Library"
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
            icon={<LibraryMusicIcon/>}
            defaultOpen={['/favorite', '/account', '/recommendation'].includes(activePage)}
          >
            <MenuItem
              style={{
                backgroundColor: activePage === '/favorite' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/favorite' ? "rgb(24,24,29)" : "white",
              }}
              icon={<FavoriteIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/favorite')}
            >
              Favorites
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: activePage === '/account' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/account' ? "rgb(24,24,29)" : "white",
              }}
              icon={<AccountCircleIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/account')}
            >
              Account
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: activePage === '/recommendation' ? "lightgray" : "rgb(24,24,29)",
                color: activePage === '/recommendation' ? "rgb(24,24,29)" : "white",
              }}
              icon={<RecommendIcon />}
              className="menu-item"
              onClick={() => handleNavigation('/recommendation')}
            >
              Recommendation
            </MenuItem>
          </SubMenu>
        </Menu>

        <button
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sign Out
          </span>
        </button>
      </Sidebar>
    </>
  );
};


export default Sidenavbar;
