"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white px-8 h-[92px] flex items-center justify-between shadow-sm">

      {/* LEFT */}
      <div>
        <Link href="/" className="text-[42px] font-bold italic text-black">
          Dribbble
        </Link>
      </div>

      {/* CENTER MENU */}
      <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">

        <li>
          <Link
            href="/"
            className="hover:bg-gray-100 rounded-lg font-bold text-2xl px-3 py-2 transition"
          >
         Home
          </Link>
        </li>

         <Link
            href="/posts"
            className="hover:bg-gray-100 rounded-lg font-bold text-2xl px-3 py-2 transition"
          >
           Post
          </Link>
         <Link
            href="/products"
            className="hover:bg-gray-100 rounded-lg font-bold text-2xl px-3 py-2 transition"
          >
           Products
          </Link>
         <Link
            href="/books"
            className="hover:bg-gray-100 rounded-lg font-bold text-2xl px-3 py-2 transition"
          >
           Books
          </Link>

       

        {/* DROPDOWN */}
        <li className="relative group">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg">
            Shots <ChevronDown size={16} />
          </div>

          {/* Dropdown Menu */}
          <ul className="absolute left-0 top-full mt-3 w-[220px] rounded-xl bg-white shadow-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

            <li>
              <a className="block hover:bg-gray-100 rounded-lg px-3 py-2">
                Popular
              </a>
            </li>

            <li>
              <a className="block hover:bg-gray-100 rounded-lg px-3 py-2">
                New & Noteworthy
              </a>
            </li>

            <li>
              <a className="block hover:bg-gray-100 rounded-lg px-3 py-2">
                Trending
              </a>
            </li>

          </ul>
        </li>
      </ul>

      {/* RIGHT (optional button) */}
      <div>
        <button className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition">
          Sign up
        </button>
      </div>

    </div>
  );
}