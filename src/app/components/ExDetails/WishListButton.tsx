"use client";

import React from "react";
import { useExsContext } from "@/context/ExsContext";
import { IEx } from "@/types/Ex.type";
import toast from "react-hot-toast";

interface WishListButtonProps {
  exercise: IEx;
}

const WishListButton = ({ exercise }: WishListButtonProps) => {
  const { wishlist, setwishlist } = useExsContext();

  const isSaved = wishlist.some((item) => item.id === exercise.id);

  const handleToggleWishlist = () => {
    if (isSaved) {
      toast.error("Already saved", {
        icon: "❌",
      });
    } else {
      setwishlist([...wishlist, exercise]);
      toast.success("Saved for later", {
        icon: "🟢",
      });
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className="w-full py-3.5 px-6 rounded-xl font-semibold border border-gray-700 bg-[#181e29] text-white hover:bg-[#222a38] transition duration-300 flex items-center justify-center gap-2"
    >
      <span>♡ Save for later</span>
    </button>
  );
};

export default WishListButton;