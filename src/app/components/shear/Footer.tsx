import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b0e14] border-t border-gray-800/60 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog Logo" width={30} height={30} className="object-contain" />
          <span className="text-white font-black text-lg tracking-wider uppercase">
            FITLOG
          </span>
        </div>

        {/* Copyright Text */}
        <p className="text-gray-500 text-xs md:text-sm font-medium text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;