import Link from "next/link";
import {
  HomeIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ElementType, ReactNode } from "react";
import logo from "../app/dyy_logo.png";

export default function Navbar() {
  return (
    <nav className="bg-college-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                className="h-10 w-auto"
                src={logo}
                alt="D.Y. Patil College Logo"
                width={100} // Set width explicitly
                height={40} // Set height explicitly
              />
              <span className="ml-3 text-xl font-bold">
                D.Y. Patil College of Engineering
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/" icon={HomeIcon}>
                Home
              </NavLink>
              <NavLink href="/admissions" icon={DocumentCheckIcon}>
                Admissions
              </NavLink>
              <NavLink href="/academics" icon={AcademicCapIcon}>
                Academics
              </NavLink>
              <NavLink href="/campus-life" icon={UsersIcon}>
                Campus Life
              </NavLink>
              <NavLink href="/chatbot" icon={UsersIcon}>
                AI Assistant
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
  icon?: ElementType;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon: Icon }) => {
  return (
    <Link
      href={href}
      className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </Link>
  );
};
