import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { useSession, signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="space-y-2 min-w-max max-w-lg ">
      <div
        className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden 
      relative flex flex-col items-center  text-center border border-gray-300 dark:border-none
      "
      >
        <div className="relative w-full h-14 ">
          <Image
            src="https://picsum.photos/seed/picsum/200/300"
            layout="fill"
            priority
          />
        </div>
        <Avatar
          onClick={signOut}
          src={session?.user?.image}
          className=" !h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="space-x-0.5 py-4 mt-5 ">
          <h4 className="hover:underline decoration-purple-700 underline-offset-2 cursor-pointer">
            {session?.user?.name}
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm  ">
            {session?.user?.email}
          </p>
        </div>
        <div
          className="hidden md:inline dark:text-white/75 text-sm 
        text-left"
        >
          <div className="space-y-0.5 font-medium sidebarbutton">
            <div className="flex justify-between space-x-2">
              <h4>Who Viewed your profile?</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your posts:</h4>
              <span className="text-blue-500">1,569</span>
            </div>
          </div>
          <div className="sidebarbutton">
            <h4 className="text-xs leading-4">
              Access exclusive tools & insights
            </h4>
            <h4 className="dark:text-white font-medium">
              <span
                className="h-3 w-3 bg-gradient-to-tr  from-yellow-700 to-yellow-200
              inline-block rounded-sm mr-1"
              />
              {""}
              Try Premium for free
            </h4>
          </div>
          <div className="sidebarbutton flex items-center space-x-0.5">
            <BookmarkOutlinedIcon className=" -ml-1" />
            <h4 className="dark:text-white font-medium">My items</h4>
          </div>
        </div>
      </div>
      <div
        className="hidden md:flex text-black/70 bg-white
           dark:bg-[#1D2226] dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5
           sticky top-20 border-gray-300 dark:border-none "
      >
        <p className="sidebarLink">Groups</p>
        <div className="flex justify-between items-center">
          <p className="sidebarLink">Events</p>
          <AddRoundedIcon />
        </div>
        <p className="sidebarLink">Followed Hashtags</p>
        <div className="sidebarbutton">
          <h4 className="dark:text-white font-medium text-sm pl-10">
            Discover More
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
