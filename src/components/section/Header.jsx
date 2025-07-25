"use client";

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import ProfileSheet from "../atom/ProfileSheet";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const navLinks = [
  { name: "Home", key: "", href: "/" },
  { name: "Movies", key: "movies", href: "/movies" },
  { name: "TV Shows", key: "tv", href: "/tv" },
  { name: "Watchlist", key: "watchlist", href: "/watchlist" },
  { name: "Stream+", key: "stream+", href: "/stream+" },
];


export default function Header() {
  // anything that start with use are hooks 
  const path = usePathname();
  const activeTabKey = path.split("/")[1];
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchResult = () => {
    if (searchQuery == "") return;
    setLoading(true);
    router.push(`/search?query=${searchQuery}`);
    setLoading(false);
    setSearchQuery("");
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-gray-300" />
      </div>
    );
  }
 
  return(
    <header className="bg-[#0d0e10] py-4 w-full fixed top-0 z-50  border-b-2 border-b-grey">
      <div className="lg:mx-auto mx-2 lg:px-4 flex items-center text-nowrap">
        <div className="flex">
          <Link href="/" className="flex items-center gap-1 h-9 max-w-24 md:max-w-[136px]">
            <Image
              src="/logo.svg"
              alt="StreamHub Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain flex-shrink-0"
            />
            <span className="text-lg font-semibold text-white hidden md:block">StreamHub</span>
          </Link>

          <Link
            href="/subscription"
            className="ml-4 mr-4 md:px-4 px-4 py-1 font-medium rounded-3xl flex items-center gap-2 text-[#c1a362] border-[#c1a362] border text-sm md:text-base"
          >
            <Image src="/crown.svg" height={16} width={16} alt="crown" />
            <span className="pr-4">
              Go Premium
            </span>
          </Link>
        </div>
        <nav className="lg:flex lg:space-x-4 space-x-0 hidden">
          {navLinks.map((tab) => (
            <Link
              href={tab.href}
              key={tab.key}
              className={`px-1 py-2 font-medium text-[#b6b8b8] hover:text-white ${activeTabKey === tab.key
                ? "border-b-2 border-pink-500 text-white"
                : ""
              } `}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end w-full">
          <div className="rounded-3xl border lg:flex justify-center items-center px-4 gap-2 hidden outline-1">
            <Image src="/search.svg" alt="search icon" height={20} width={20} />
            <input
              type="text"
              placeholder="Search..."
              className=" py-2 bg-transparent  text-white font-medium focus:outline-none text-sm max-w-[150px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? searchResult() : null)}
            />
          </div>
          <ProfileSheet />
        </div>
      </div>
    </header>
  )
}