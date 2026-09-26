import React from 'react';
import Banner from '@/app/components/homepage/Banner';
import Ex from "@/app/components/homepage/ex";

const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Banner />
      <Ex />
    </div>
  );
};

export default page;