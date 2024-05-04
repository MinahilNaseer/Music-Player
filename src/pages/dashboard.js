import React, { useState } from "react";
import "./dashboard.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import MicIcon from "@mui/icons-material/Mic";
import AlbumIcon from "@mui/icons-material/Album";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RecommendIcon from "@mui/icons-material/Recommend";
import SearchIcon from "@mui/icons-material/Search";

const DashBoard = () => {
  const { collapseSidebar } = useProSidebar();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuOpen = () => {
    setIsSubMenuOpen(true);
  };

  const handleSubMenuClose = () => {
    setIsSubMenuOpen(false);
  };
  return (
    <div className="dashboard" id="dash">
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
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "rgb(70,91,196)",
              }}
              icon={<ExploreIcon />}
              className="submenu-item"
            >
              Discover
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<PeopleOutlinedIcon />}
              className="submenu-item"
            >
              Around You
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<MicIcon />}
              className="submenu-item"
            >
              Top Artist
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<AlbumIcon />}
              className="submenu-item"
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
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<FavoriteIcon />}
              className="submenu-item"
            >
              Favorites
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<FeaturedPlayListIcon />}
              className="submenu-item"
            >
              Playlist
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<AccountCircleIcon />}
              className="submenu-item"
            >
              Account
            </MenuItem>
            <MenuItem
              style={{
                backgroundColor: isSubMenuOpen ? "white" : "rgb(24,24,29)",
                color: isSubMenuOpen ? "black" : "white",
              }}
              icon={<RecommendIcon />}
              className="submenu-item"
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
      <main>
        <div className="top-heading-container">
          <h3 className="top-heading">MUSIC</h3>
          <div className="content">
            <div className="search-bar">
              <SearchIcon className="search-icon" />
              <input type="text" className="textbox" placeholder="Search..." />
            </div>
            <div className="account">
              <AccountCircleIcon />
              <h4>Account</h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
