import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo3 from "../public/logo3.png";
import logo2 from "../public/logo2.svg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  //After mounting, we have access to theme.You should delay rendering any theme toggling UI until mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <>
      <header
        className="flex items-center justify-around z-40 top-0 sticky py-1.5
      px-3 bg-white focus-within:shadow-lg dark:bg-[#1D2226] "
      >
        <div className="flex space-x-2 items-center max-w-xs w-full">
          {mounted && resolvedTheme === "dark" ? (
            <Image src={logo3} width="45" height="45" />
          ) : (
            <Image src={logo2} width="55" height="55" />
          )}

          <div className="flex items-center space-x-1 px-4 py-4 w-full rounded dark:md:bg-gray-700">
            <SearchRoundedIcon />
            <input
              type="text"
              placeholder="Search"
              //md:inline-flex gozashtim be khatere flex-grow ke in textbox bozorg beshe vaghti safhe bozorg mishe
              className="hidden md:inline-flex bg-transparent text-sm focus:outline-none
             placeholder-black/70 dark:placeholder-white/75 flex-grow"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 ">
          <HeaderLink Icon={HomeRoundedIcon} text="Home" feed />
          <HeaderLink Icon={GroupIcon} text="My Network" feed active />
          <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
          <HeaderLink Icon={ChatIcon} text="Messaging" feed />
          <HeaderLink Icon={NotificationsIcon} text="Notification" feed />
          <HeaderLink Icon={Avatar} text="Me" feed hidden avatar />
          <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />
          {mounted && (
            <div
              className={`relative bg-gray-600 rounded-full flex-shrink-0 px-0.5 h-7 w-12 
          flex items-center ${
            resolvedTheme === "dark" ? "justify-end" : "justify-start"
          } cursor-pointer  `}
              onClick={() => {
                resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              <span className="absolute left-0">🌜</span>
              <motion.div
                className=" w-5 h-5 bg-white z-40 rounded-full"
                layout
                transition={spring}
              ></motion.div>
              <span className="absolute right-0 -mt-0.5">🌞</span>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
