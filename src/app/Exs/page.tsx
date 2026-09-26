import React from "react";
import ExCard from "../components/shear/ExCard";
import { IEx } from '@/types/Ex.type';


const getExs = async () => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await response.json();
  return data;
};

const Ex = async () => {
  const exsData = await getExs();

  return (
    <section className="container mx-auto my-[70px] px-4">

      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#172554]">
          THE <span className="text-violet-600">LIBRARY</span>
        </h2>

        <p className="mt-2 text-gray-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exsData.map((ex:IEx, ind:number) => {
          return <ExCard key={ind} ex={ex} />
        }
        )}

      </div>
    </section>
  );
};

export default Ex;