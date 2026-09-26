"use client";

import React from "react";
import { useExsContext } from "@/context/ExsContext";
import { IEx } from "@/types/Ex.type";
import toast from "react-hot-toast";

interface ExButtonProps {
  exercise: IEx;
}

const ExButton = ({ exercise }: ExButtonProps) => {
  const { DoingExs, setDoingExs } = useExsContext();

  const isAdded = DoingExs.some((item) => item.id === exercise.id);

  const handleDoingExs = () => {
    if (isAdded) {
      toast.error("Already in your plan", {
        icon: "❌",
      });
    } else {
      setDoingExs([...DoingExs, exercise]);
      toast.success("Added to today's plan", {
        icon: "🟢",
      });
    }
  };

  return (
    <button
      onClick={handleDoingExs}
      className="w-full py-3.5 px-8 rounded-xl font-bold transition duration-300 shadow-md bg-[#ccff00] text-black hover:bg-[#b3e600]"
    >
      + Add to today's
    </button>
  );
};

export default ExButton;