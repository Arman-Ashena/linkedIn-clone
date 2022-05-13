import Image from "next/image";
import HeaderLink from "../components/HeaderLink";
import logo from "../public/Logo.png";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import lpg1 from "../public/lpg1.svg";
import { getProviders, signIn } from "next-auth/react";

function Home({ providers }) {
  return (
    <>
      <div className="relative space-y-10 ">
        <header className=" flex justify-around items-center py-4">
          <div className="relative w-36 h-10 ">
            <Image src={logo} layout="fill" objectFit="cover"></Image>
          </div>
          <div className="flex divide-gray-300 sm:divide-x ">
            <div className="hidden sm:flex space-x-8 pr-4  ">
              <HeaderLink Icon={ExploreIcon} text="Discover" />
              <HeaderLink Icon={GroupIcon} text="People" />
              <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
              <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
            </div>
            {Object.values(providers).map((provider) => (
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold border 
                     border-blue-700 px-5 py-1.5 rounded-full hover:border-2 transition-all"
                  onClick={() => signIn()}
                >
                  Sign In
                </button>
              </div>
            ))}
          </div>
        </header>

        <main className=" flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto my-7  ">
          <div className="space-y-6 xl:space-y-10 ">
            <h1 className="text-3xl md:text-5xl max-w-xl pl-4 xl:pl-0 !leading-snug text-amber-800/80">
              Welcome to your professional community
            </h1>

            <div className="space-y-4">
              <div className="intent">
                <h2 className="text-xl">Search for a Job</h2>
                <ArrowForwardIosRoundedIcon className="text-gray-700" />
              </div>
              <div className="intent">
                <h2 className="text-xl">Find a Person you know</h2>
                <ArrowForwardIosRoundedIcon className="text-gray-700" />
              </div>
              <div className="intent">
                <h2 className="text-xl">Learn a new skill</h2>
                <ArrowForwardIosRoundedIcon className="text-gray-700" />
              </div>
            </div>
          </div>
          <div className="relative xl:absolute  xl:w-[650px] xl:h-[650px] w-80 h-80 top-14 right-5">
            <Image src={lpg1} layout="fill" priority />
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
