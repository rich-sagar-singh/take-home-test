"use client";

import { FiltersProps } from "@/utils/Interfaces/interfaces";
import debounce from "lodash/debounce";
import { useMemo } from "react";

export default function Filters({
  selectedBreed,
  setSelectedBreed,
  zipCode,
  setZipCode,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  sortOrder,
  setSortOrder,
  breeds,
}: FiltersProps) {
  const debouncedSetZipCode = useMemo(
    () => debounce(setZipCode, 500),
    [setZipCode]
  );
  const debouncedSetAgeMin = useMemo(
    () => debounce(setAgeMin, 500),
    [setAgeMin]
  );
  const debouncedSetAgeMax = useMemo(
    () => debounce(setAgeMax, 500),
    [setAgeMax]
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 md:rounded-full rounded-3xl shadow-lg mb-6 w-full gap-4">
      <select
        className="p-3 bg-pink-300 text-gray-900 rounded-full appearance-none w-full sm:w-auto border-2 border-pink-400 focus:ring focus:ring-pink-300 text-center"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Zip Code"
        defaultValue={zipCode}
        onChange={(e) => debouncedSetZipCode(e.target.value)}
        className="p-3 bg-white text-gray-900 rounded-full border-2 border-pink-400 focus:ring focus:ring-pink-300 md:w-36 w-full text-center"
      />

      <div className="flex items-center gap-2 bg-pink-200 px-4 py-3 rounded-full border-2 border-pink-400 md:w-auto w-full justify-center">
        <label className="text-gray-800 text-sm font-semibold">Age:</label>
        <input
          type="number"
          placeholder="Min"
          defaultValue={ageMin}
          onChange={(e) => debouncedSetAgeMin(e.target.value)}
          className=" bg-white text-gray-900 rounded-md border border-pink-400 focus:ring focus:ring-pink-300 w-16 text-center"
        />
        <span className="text-gray-700">-</span>
        <input
          type="number"
          placeholder="Max"
          defaultValue={ageMax}
          onChange={(e) => debouncedSetAgeMax(e.target.value)}
          className=" bg-white text-gray-900 rounded-md border border-pink-400 focus:ring focus:ring-pink-300 w-16 text-center"
        />
      </div>

      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="p-3 bg-yellow-400 text-white rounded-full transition hover:bg-yellow-500 shadow-md w-20 flex justify-center items-center"
      >
        {sortOrder === "asc" ? "A → Z" : "Z → A"}
      </button>
    </div>
  );
}
