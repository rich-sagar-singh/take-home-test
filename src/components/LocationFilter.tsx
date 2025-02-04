"use client";

import { useState } from "react";
import { useDogStore } from "@/store/useDogStore";
import { LocationFilterProps } from "@/utils/Interfaces/interfaces";

export default function LocationFilter({ setZipCodes }: LocationFilterProps) {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const { searchLocations } = useDogStore();

  const handleLocationSearch = async () => {
    if (!city && !state) {
      setZipCodes([]);
      return;
    }

    try {
      const zipCodesFromLocation: string[] = await searchLocations(
        city,
        state ? [state] : []
      );

      if (zipCodesFromLocation.length === 0) {
        console.warn("No zip codes found for this location.");
        return;
      }

      setZipCodes((prevZipCodes: string[]) => [
        ...new Set([...prevZipCodes, ...zipCodesFromLocation]),
      ]);
    } catch (error) {
      console.error("Error fetching zip codes:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-100 py-4 rounded-2xl shadow-lg mb-6 w-full gap-4">
      <div className="flex justify-between mt-10 gap-5">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 bg-white text-gray-900 rounded-full border-2 border-blue-400 focus:ring focus:ring-blue-300 w-36 text-center"
        />

        <input
          type="text"
          placeholder="State (e.g. CA)"
          value={state}
          maxLength={2}
          onChange={(e) => setState(e.target.value.toUpperCase())}
          className="p-3 bg-white text-gray-900 rounded-full border-2 border-blue-400 focus:ring focus:ring-blue-300 w-40 text-center"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleLocationSearch}
          className="p-3 bg-blue-500 text-white rounded-full transition hover:bg-blue-600 shadow-md"
        >
          Apply Location
        </button>

        <button
          onClick={() => {
            setCity("");
            setState("");
            setZipCodes([]);
          }}
          className="p-3 bg-gray-400 text-white rounded-full transition hover:bg-gray-500 shadow-md"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
