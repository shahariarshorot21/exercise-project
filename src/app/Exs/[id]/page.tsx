"use client";

import React from "react";
import Image from "next/image";
import cardImg from "@/assets/cardimage.jpg";
import { useExsContext } from "@/context/ExsContext";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ExerciseDetailsPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;


  const context = useExsContext();
  const DoingExs = context?.DoingExs || [];
  const setDoingExs = context?.setDoingExs || (() => {});
  const wishlist = context?.wishlist || [];
  const setwishlist = context?.setwishlist || (() => {});
  const workouts = context?.workouts || [];
  const loading = context?.loading ?? false;


  const ex = workouts.find((item: any) => String(item.id) === String(id));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest">
          Loading exercise details...
        </p>
      </div>
    );
  }

  if (!ex) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
        <p className="text-red-500 font-bold uppercase tracking-widest">
          Exercise not found!
        </p>
      </div>
    );
  }

  // State checks
  const isPlanned = DoingExs.some(
    (item: any) => String(item.id) === String(ex.id)
  );

  const isSaved = wishlist.some(
    (item: any) => String(item.id) === String(ex.id)
  );

  // Plan Handlers
  const handleTogglePlan = () => {
    if (isPlanned) {
      toast.error("Already in your plan", {
        icon: "❌",
        duration: 500,
      });

      return;
    }

    setDoingExs([...DoingExs, ex]);

    toast.success("Added to today's plan", {
      icon: "🟢",
      duration: 500,
    });
  };

  // Save Handlers
  const handleToggleSave = () => {
    if (isSaved) {
      toast.error("Already saved", {
        icon: "❌",
        duration: 500,
      });

      return;
    }

    setwishlist([...wishlist, ex]);

    toast.success("Saved for later", {
      icon: "🟢",
      duration: 500,
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Exercise Image */}
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-gray-900 border border-gray-800">
          <Image
            src={cardImg}
            alt={ex.name || "Exercise"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Exercise Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide text-white">
              {ex.name}
            </h1>

            <p className="text-gray-400 text-sm md:text-base mt-2">
              {ex.description}
            </p>

            {/* Muscle Group Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {ex.muscleGroups?.map(
                (muscle: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-3 py-1 rounded-full"
                  >
                    {muscle}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Info Stats Table (1st sobir moto upor-niche serial layout) */}
          <div className="bg-[#121620] border border-gray-800/80 rounded-2xl px-6 py-2 divide-y divide-gray-800/60">
            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Equipment
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.equipment}
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Difficulty
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.difficulty}
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Sets
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.sets || "3-4"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Reps
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.reps || "8-12"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Duration
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.duration} min
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Calories
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex justify-between items-center py-3.5">
              <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                Rating
              </span>
              <span className="font-bold text-gray-200 text-sm">
                {ex.rating || "4.8"}
              </span>
            </div>
          </div>

          {/* Instructions */}
          {ex.instructions && ex.instructions.length > 0 && (
            <div>
              <h3 className="text-lg font-black uppercase text-white tracking-wider mb-3">
                Instructions
              </h3>

              <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                {ex.instructions.map(
                  (step: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  )
                )}
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">

            {/* Add to Today's Plan */}
            <button
              onClick={handleTogglePlan}
              className="flex-1 font-extrabold text-sm uppercase py-3.5 px-6 rounded-xl transition duration-200 bg-[#ccff00] text-black hover:bg-[#b8e600]"
            >
              + Add to Today's Plan
            </button>

            {/* Save Workout */}
            <button
              onClick={handleToggleSave}
              className="flex-1 font-extrabold text-sm uppercase py-3.5 px-6 rounded-xl transition duration-200 border bg-[#1c2230] text-white hover:bg-gray-800 border-gray-700"
            >
              ♡ Save Workout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}