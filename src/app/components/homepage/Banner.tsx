"use client";

import Image from "next/image";
import BannerImg from "@/assets/banner.png";

const Banner = () => {
  const handleScrollToWorkouts = () => {
    const section = document.getElementById("exercise-section");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 rounded-3xl bg-slate-900 p-6 md:grid-cols-2 md:p-12">

        {/* Left Side */}
        <div className="space-y-5">
          <p className="font-bold tracking-widest text-lime-400 text-sm">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="leading-relaxed text-gray-400 text-sm md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            <br />
            into today's plan, and watch the week's work add up.
          </p>

          <button
            onClick={handleScrollToWorkouts}
            className="rounded-xl bg-lime-400 px-6 py-3.5 font-bold text-black transition duration-300 hover:bg-lime-300 active:scale-95"
          >
            BROWSE WORKOUTS
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center">
          <Image
            src={BannerImg}
            alt="Workout Banner"
            priority
            className="h-auto w-full max-w-[500px] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;