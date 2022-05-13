import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Modal from "../components/Modal";
import { modalState, modalTypeState } from "../atoms/ModalAtom";
import { AnimatePresence } from "framer-motion";
import { connectToDatabase } from "../util/mongodb";
import Widgets from "../components/Widgets";
import axios from "axios";
//dfdf
export default function Home({ posts, articles }) {
  console.log("articles", articles);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      //if the use is not authenticated, handle it here
      //router.push("/home");
    },
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  return (
    <div
      className="bg-[#F3F2EF] dark:bg-black dark:text-white overflow-y-auto 
    h-screen md:space-y-6
    "
    >
      <Head>
        <title>Linked In</title>
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5">
        <div className="flex gap-5 flex-col md:flex-row">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession();
  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/home",
  //     },
  //   };
  // }
  //Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timeStamp: -1 })
    .toArray();

  //Get google News Api
  const { data } = await axios.get(
    `http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );

  return {
    props: {
      session,
      articles: data?.articles || null,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        userame: post.username || null,
        email: post.email || null,
        userImg: post.userImg || null,
        createdAt: post.createdAt,
      })),
    },
  };
}
