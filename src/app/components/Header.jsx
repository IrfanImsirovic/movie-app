import Link from "next/link";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  return (
    <div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center py-6">
      <div className="flex">
        <MenuItem title="Home" address="/" Icon={AiFillHome} />
        <MenuItem title="About" address="/about" Icon={AiFillInfoCircle} />
      </div>
      <div className="flex items-center space-x-5">
        <DarkModeSwitch />
        <Link href="/">
          <h2 className="text-2xl">
            <span className="font-bold bg-red-950 py-1 px-2 rounded-lg text-white ">
              Movies
            </span>
            <span className="font-bold hidden sm:inline">App</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
