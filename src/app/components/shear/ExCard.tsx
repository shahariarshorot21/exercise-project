import { IEx } from "@/types/Ex.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardImg from "@/assets/cardimage.jpg";

interface IExcardProps {
  ex: IEx;
}

const ExCard = ({ ex }: IExcardProps) => {
  return (
    <Link href={`/Exs/${ex.id}`} prefetch={true} className="block h-full">
      <div className="bg-[#121620] border border-gray-800 rounded-3xl p-4 flex flex-col justify-between hover:border-gray-700 hover:scale-[1.02] transition duration-300 cursor-pointer h-full">
        
        {/* Exercise Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900">
          <Image
            src={cardImg}
            alt={ex.name}
            fill
            className="object-cover"
          />
          
          {/* Difficulty Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-black ${
              ex.difficulty === "Beginner"
                ? "bg-green-400"
                : ex.difficulty === "Intermediate"
                ? "bg-yellow-400"
                : "bg-red-500 text-white"
            }`}
          >
            {ex.difficulty}
          </span>
        </div>

        {/* Details Section */}
        <div className="mt-4 flex flex-col flex-grow justify-between">
          <div>
            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {ex.muscleGroups?.map((muscle, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-black text-white uppercase tracking-wide line-clamp-1 mt-1">
              {ex.name}
            </h3>

            {/* Stats Info */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-800/80 text-center">
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold">Equipment</p>
                <p className="text-xs font-bold text-gray-200 truncate">{ex.equipment}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold">Duration</p>
                <p className="text-xs font-bold text-gray-200">{ex.duration}m</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold">Calories</p>
                <p className="text-xs font-bold text-gray-200">{ex.caloriesBurned}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default ExCard;