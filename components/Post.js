import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import {
  getPostState,
  handlePostState,
  modalState,
  modalTypeState,
} from "../atoms/ModalAtom";
import { useRecoilState } from "recoil";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplyRounded";
import TimeAgo from "timeago-react";
import axios from "axios";

const Post = ({ post, modalPost }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const { data: session } = useSession();

  const truncate = (text, n) => {
    return text?.length > n ? text.substr(0, n - 1) + "...see more" : text;
  };

  const deletePost = async () => {
    console.log("qwe", post);
    const { status } = await axios.delete(
      `http://localhost:3000/api/posts/${post._id}`
    );
    if (status == 200) {
      setHandlePost(true);
      setModalOpen(false);
    }
  };
  return (
    <>
      <div
        className={` bg-white dark:bg-[#1D2226] border
     border-gray-300 py-2.5 space-y-2 dark:border-none ${
       modalPost ? "rounded-r-lg" : "rounded-lg"
     }`}
      >
        <div className="flex justify-start px-2.5 cursor-pointer">
          <div className=" w-10 h-10 ">
            <Avatar src={session?.user?.image} />
          </div>
          <div className="mr-auto ml-2 leading-none">
            <p className="font-medium hover:text-blue-500 hover:underline">
              Arman
            </p>
            <p className=" text-sm dark:text-white/60 ">ak.pcnet@gmail.com</p>
            <TimeAgo
              datetime={post.createdAt}
              className="text-xs dark:text-white/75 opacity-80"
            />
          </div>
          {modalPost ? (
            <IconButton onClick={() => setModalOpen(false)}>
              <CloseRoundedIcon className="dark:text-white/60  h-7 w-7" />
            </IconButton>
          ) : (
            <IconButton>
              <MoreHorizRoundedIcon className="dark:text-white/60 w-7" />
            </IconButton>
          )}
        </div>
        {post.input && (
          <div className="px-2.5 break-all md:break-normal">
            {showInput || modalPost ? (
              <p onClick={() => setShowInput(false)}>{post.input}</p>
            ) : (
              <p onClick={() => setShowInput(true)}>
                {truncate(post.input, 150)}
              </p>
            )}
          </div>
        )}
        {post.photoUrl && !modalPost && (
          <img
            src={post.photoUrl}
            className="w-full cursor-pointer"
            onClick={() => {
              setModalOpen(true);
              setModalType("gifYouUp");
              setPostState(post);
            }}
          />
        )}
        <div
          className="flex mx-2.5 justify-evenly items-center dark:border-t
         border-gray-600 pt-2
       text-black/60 dark:text-white/75"
        >
          {modalPost ? (
            <button className="postButton">
              <CommentOutlinedIcon />
              <h4>Comment</h4>
            </button>
          ) : (
            <button
              className={`postButton ${liked && "text-blue-500"}`}
              onClick={() => {
                setLiked(!liked);
              }}
            >
              {liked ? (
                <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
              ) : (
                <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
              )}
              <h4>Like</h4>
            </button>
          )}

          {session?.user?.email === post.email ? (
            <button className="postButton" onClick={deletePost}>
              <DeleteRoundedIcon />
              <h4>Delete Post</h4>
            </button>
          ) : (
            <button className="postButton">
              <ReplayRoundedIcon />
              <h4>Share</h4>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;