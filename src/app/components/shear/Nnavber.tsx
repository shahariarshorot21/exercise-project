"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { EsxContext } from "@/context/ExsContext";

const Nnavber = () => {
  const context = useContext(EsxContext);
  const DoingExs = context?.DoingExs || [];
  const wishlist = context?.wishlist || [];

  return (
    <nav className="w-full bg-[#0b0e14] border-b border-gray-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog Logo" width={30} height={30} className="object-contain" />
          <span className="text-white font-black text-xl tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-300 hover:text-white font-bold text-sm uppercase">
            Workouts
          </Link>
          <Link href="/listed-ex" className="text-gray-300 hover:text-white font-bold text-sm uppercase">
            My Plan
          </Link>
        </div>

        {/* Plan & Saved Counters */}
        <div className="flex items-center gap-3">
          <Link
            href="/listed-ex?tab=plan"
            className="bg-[#ccff00] text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#b8e600] transition"
          >
            <span>PLAN</span>
            <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {DoingExs.length}
            </span>
          </Link>
          <Link
            href="/listed-ex?tab=saved"
            className="bg-[#22231d] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#312929] transition"
          >
            <span>SAVED</span>
            <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nnavber;