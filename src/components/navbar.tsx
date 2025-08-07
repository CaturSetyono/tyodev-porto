import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-black/30 backdrop-blur-md py-2 px-6 rounded-full border border-white/10">
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="#home"
              className="text-sm font-medium text-white/80 hover:text-white transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-sm font-medium text-white/80 hover:text-white transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#skills"
              className="text-sm font-medium text-white/80 hover:text-white transition"
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="text-sm font-medium text-white/80 hover:text-white transition"
            >
              Projects
            </Link>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="text-sm text-white/80 hover:text-white hover:bg-white/10"
            >
              <Link href="#contact">Contact</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
