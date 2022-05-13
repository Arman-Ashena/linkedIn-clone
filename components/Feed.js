import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/ModalAtom";
import Input from "./Input";
import Post from "../components/Post";

const Feed = ({ posts }) => {
  const [realtimeData, setRealtimeData] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  //dfsfs
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);
      setRealtimeData(data);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    getPosts();
  }, [handlePost]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {!useSSRPosts
        ? realtimeData.map((post) => (
            <Post key={post._id} post={post} modalPost={false} />
          ))
        : posts.map((post) => (
            <Post key={post._id} post={post} modalPost={false} />
          ))}
    </div>
  );
};

export default Feed;
