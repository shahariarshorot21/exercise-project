"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useExsContext } from "@/context/ExsContext";
import cardImg from "@/assets/cardimage.jpg";

function ListedExContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const {
    DoingExs = [],
    setDoingExs,
    wishlist = [],
    setwishlist,
  } = useExsContext();

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("plan");
    }
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/listed-ex?tab=${tab}`);
  };

  const handleRemoveFromPlan = (id) => {
    setDoingExs(DoingExs.filter((item) => item.id !== id));
  };

  const handleRemoveFromSaved = (id) => {
    setwishlist(wishlist.filter((item) => item.id !== id));
  };

  const currentList = activeTab === "plan" ? DoingExs : wishlist;

  const totalExercises = currentList?.length || 0;

  const totalMinutes =
    currentList?.reduce(
      (sum, item) => sum + (Number(item.duration) || 0),
      0
    ) || 0;

  const totalCalories =
    currentList?.reduce(
      (sum, item) => sum + (Number(item.caloriesBurned) || 0),
      0
    ) || 0;

  // Sort exercises
  const sortedList = [...(currentList || [])].sort((a, b) => {
    if (sortBy === "duration") {
      return (Number(a.duration) || 0) - (Number(b.duration) || 0);
    }

    if (sortBy === "calories") {
      return (
        (Number(a.caloriesBurned) || 0) -
        (Number(b.caloriesBurned) || 0)
      );
    }

    if (sortBy === "rating") {
      return (Number(a.rating) || 0) - (Number(b.rating) || 0);
    }

    return 0;
  });

  return (
    <div className="bg-[#0b0e14] min-h-screen text-white py-10 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide uppercase font-sans">
            MY PLAN
          </h1>

          <p className="text-gray-400 mt-1 text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-[#121620] border border-gray-800/80 rounded-2xl p-6 mb-8 grid grid-cols-3 gap-4 text-left">

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Exercises
            </p>

            <p className="text-4xl font-black text-[#ccff00] mt-1">
              {totalExercises}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Minutes
            </p>

            <p className="text-4xl font-black text-white mt-1">
              {totalMinutes}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Calories
            </p>

            <p className="text-4xl font-black text-white mt-1">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tab Controls & Sort */}
        <div className="flex items-center justify-between mb-8">

          <div className="flex bg-[#161a23] p-1 rounded-xl border border-gray-800">

            <button
              onClick={() => handleTabChange("plan")}
              className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition ${
                activeTab === "plan"
                  ? "bg-[#222834] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today's Plan ({DoingExs?.length || 0})
            </button>

            <button
              onClick={() => handleTabChange("saved")}
              className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition ${
                activeTab === "saved"
                  ? "bg-[#222834] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({wishlist?.length || 0})
            </button>

          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">

            <span>Sort By</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#161a23] border border-gray-800 text-white rounded-lg px-3 py-1.5 focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

          </div>

        </div>

        {/* Content Section */}
        {sortedList && sortedList.length > 0 ? (

          <div className="space-y-4">

            {sortedList.map((ex) => (

              <div
                key={ex.id}
                className="bg-[#121620] border border-gray-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition hover:border-gray-700"
              >

                {/* Exercise Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">

                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-900">

                    <Image
                      src={
                        ex.image &&
                        typeof ex.image === "string" &&
                        ex.image.startsWith("http")
                          ? ex.image
                          : cardImg
                      }
                      alt={ex.name || "Exercise"}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div>

                    <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
                      {ex.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {ex.equipment}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-300 font-medium">

                      {/* Duration */}
                      <span className="flex items-center gap-1">
                        ⏱ {ex.duration} min
                      </span>

                      {/* Calories */}
                      <span className="flex items-center gap-1 text-yellow-500">
                        🔥 {ex.caloriesBurned} kcal
                      </span>

                      {/* Rating */}
                      <span className="flex items-center gap-1 text-gray-400">
                        ⭐ {ex.rating}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">

                  <Link
                    href={`/Exs/${ex.id}`}
                    className="px-4 py-2 rounded-xl bg-[#1c2230] text-gray-300 font-semibold text-xs hover:bg-[#252d3f] transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" ? (

                    <button
                      onClick={() => handleRemoveFromPlan(ex.id)}
                      className="px-5 py-2 rounded-xl bg-[#ccff00] text-black font-bold text-xs hover:bg-[#b3e600] transition flex items-center gap-1"
                    >
                      ✓ Mark as Done
                    </button>

                  ) : null}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? handleRemoveFromPlan(ex.id)
                        : handleRemoveFromSaved(ex.id)
                    }
                    className="text-gray-500 hover:text-red-400 p-2 text-lg font-bold transition"
                    title="Remove"
                  >
                    ✕
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="border border-dashed border-gray-800 rounded-2xl py-20 text-center bg-[#121620]/40">

            <h3 className="text-2xl font-black uppercase tracking-wider text-white">
              {activeTab === "plan"
                ? "NOTHING HERE YET"
                : "NO SAVED WORKOUTS"}
            </h3>

            <p className="text-gray-400 text-sm mt-2 mb-6">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "You haven't saved any exercises to your wishlist yet."}
            </p>

            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b3e600] transition text-xs uppercase tracking-wider"
            >
              Go to workouts
            </Link>

          </div>

        )}

      </div>
    </div>
  );
}

export default function ListedExPage() {
  return (
    <Suspense
      fallback={
        <div className="text-white text-center py-10">
          Loading...
        </div>
      }
    >
      <ListedExContent />
    </Suspense>
  );
}