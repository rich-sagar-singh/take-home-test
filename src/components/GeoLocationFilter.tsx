"use client";

import { useState } from "react";
import { useDogStore } from "@/store/useDogStore";
import { GeoLocationFilterProps } from "@/utils/Interfaces/interfaces";

export default function GeoLocationFilter({
  setZipCodes,
}: GeoLocationFilterProps) {
  const [topLeftLat, setTopLeftLat] = useState<string>("");
  const [topLeftLon, setTopLeftLon] = useState<string>("");
  const [bottomRightLat, setBottomRightLat] = useState<string>("");
  const [bottomRightLon, setBottomRightLon] = useState<string>("");
  const [size, setSize] = useState<string>("25");

  const { searchLocationsByBoundingBox } = useDogStore();

  const handleGeoSearch = async () => {
    if (!topLeftLat && !topLeftLon && !bottomRightLat && !bottomRightLon) {
      setZipCodes([]);
      return;
    }

    const topLeft = { lat: Number(topLeftLat), lon: Number(topLeftLon) };
    const bottomRight = {
      lat: Number(bottomRightLat),
      lon: Number(bottomRightLon),
    };
    const sizeValue = Number(size);

    if (sizeValue <= 0 || sizeValue > 10000) {
      alert("Please enter a size between 1 and 10,000.");
      return;
    }

    try {
      const zipCodesFromGeo = await searchLocationsByBoundingBox(
        topLeft,
        bottomRight,
        sizeValue
      );
      setZipCodes(zipCodesFromGeo);
    } catch (error) {
      console.error("Error fetching geo-located zip codes:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-green-100 p-4 rounded-2xl shadow-lg mb-6 w-full gap-4">
      <div className="flex justify-between md:w-2/3">
        <div className="flex flex-col gap-2">
          <label className="text-gray-800 text-sm font-semibold">
            Top Left:
          </label>
          <input
            type="number"
            placeholder="Lat"
            value={topLeftLat}
            onChange={(e) => setTopLeftLat(e.target.value)}
            className="p-2 bg-white text-gray-900 rounded border border-green-400 focus:ring focus:ring-green-300 w-24 text-center"
          />
          <input
            type="number"
            placeholder="Lon"
            value={topLeftLon}
            onChange={(e) => setTopLeftLon(e.target.value)}
            className="p-2 bg-white text-gray-900 rounded border border-green-400 focus:ring focus:ring-green-300 w-24 text-center"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-800 text-sm font-semibold">
            Bottom Right:
          </label>
          <input
            type="number"
            placeholder="Lat"
            value={bottomRightLat}
            onChange={(e) => setBottomRightLat(e.target.value)}
            className="p-2 bg-white text-gray-900 rounded border border-green-400 focus:ring focus:ring-green-300 w-24 text-center"
          />
          <input
            type="number"
            placeholder="Lon"
            value={bottomRightLon}
            onChange={(e) => setBottomRightLon(e.target.value)}
            className="p-2 bg-white text-gray-900 rounded border border-green-400 focus:ring focus:ring-green-300 w-24 text-center"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-800 text-sm font-semibold">Size:</label>
          <input
            type="number"
            placeholder="Size (1-10,000)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2 bg-white text-gray-900 rounded border border-green-400 focus:ring focus:ring-green-300 w-24 text-center"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleGeoSearch}
          className="p-3 bg-green-500 text-white rounded-full transition hover:bg-green-600 shadow-md"
        >
          Apply Geo Location
        </button>

        <button
          onClick={() => {
            setTopLeftLat("");
            setTopLeftLon("");
            setBottomRightLat("");
            setBottomRightLon("");
            setSize("25");
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
