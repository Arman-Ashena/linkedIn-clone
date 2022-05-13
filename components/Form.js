import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { handlePostState, modalState } from "../atoms/ModalAtom";

const Form = () => {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const uploadPost = async (e) => {
    e.preventDefault();

    const getPosts = async () => {
      const newData = {
        input: input,
        photoUrl: photoUrl,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      };
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/posts",
          newData
        );
        setModalOpen(false);
        setHandlePost(true);
      } catch (error) {
        console.log("eror", error);
      }
    };
    getPosts();
  };
  return (
    <div>
      <form className="relative flex flex-col space-y-2 text-black/80 dark:text-white/75">
        <textarea
          className="bg-transparent focus:outline-none dark:placeholder-white/75"
          rows={4}
          placeholder="what do you want to talk?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Add a photo url here (optional) "
          className="bg-transparent focus:outline-none truncate dark:placeholder-white/75
          max-w-xs md:max-w-sm"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        ></input>
        <button
          className="absolute bottom-0 right-0 bg-blue-500 font-medium 
           hover:bg-blue-500
         disabled:text-black/40   disabled:bg-white/75 
         disabled:cursor-not-allowed text-white rounded-full py-1 px-3"
          disabled={!input.trim() && !photoUrl.trim()}
          type="submit"
          onClick={uploadPost}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Form;
