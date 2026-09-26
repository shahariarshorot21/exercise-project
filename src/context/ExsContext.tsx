"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IEx } from "@/types/Ex.type";

interface ExsContextType {
  DoingExs: IEx[];
  setDoingExs: React.Dispatch<React.SetStateAction<IEx[]>>;
  wishlist: IEx[];
  setwishlist: React.Dispatch<React.SetStateAction<IEx[]>>;
  workouts: IEx[];
  loading: boolean;
}

export const EsxContext = createContext<ExsContextType | null>(null);

const EsxProvider = ({ children }: { children: React.ReactNode }) => {
  const [DoingExs, setDoingExs] = useState<IEx[]>([]);
  const [wishlist, setwishlist] = useState<IEx[]>([]);
  const [workouts, setWorkouts] = useState<IEx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exercises:", err);
        setLoading(false);
      });
  }, []);

  const sharedData = {
    DoingExs,
    setDoingExs,
    wishlist,
    setwishlist,
    workouts,
    loading,
  };

  return (
    <EsxContext.Provider value={sharedData}>
      {children}
    </EsxContext.Provider>
  );
};

export const useExsContext = () => {
  const context = useContext(EsxContext);
  if (!context) {
    throw new Error("useExsContext must be used within an EsxProvider");
  }
  return context;
};

export default EsxProvider;