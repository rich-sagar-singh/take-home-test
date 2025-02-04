"use client";

import { useEffect, useState } from "react";
import { useDogStore } from "@/store/useDogStore";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Filters from "@/components/SearchAndFilters";
import LocationFilter from "@/components/LocationFilter";
import GeoLocationFilter from "@/components/GeoLocationFilter";
import Loader from "@/components/Loader";
import { Dog } from "@/utils/Interfaces/interfaces";
import Image from "next/image";

export default function SearchPage() {
  const {
    searchDogs,
    fetchDogDetails,
    getBreeds,
    fetchLocationDetails,
    isLoading,
    favorites,
    addFavorite,
    removeFavorite,
  } = useDogStore();

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalResults, setTotalResults] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [locations, setLocations] = useState<Record<string, any>>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const breedsData = await getBreeds();
      setBreeds(breedsData);
      await fetchDogs();
    }
    fetchData();
  }, [selectedBreed, zipCodes, zipCode, ageMin, ageMax, from, sortOrder]);

  const fetchDogs = async () => {
    const queryParams = {
      breeds: selectedBreed ? [selectedBreed] : [],
      zipCodes:
        zipCodes.length > 0 ? zipCodes : zipCode ? [zipCode] : undefined,
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      size: pageSize,
      from: from,
      sort: `breed:${sortOrder}`,
    };

    try {
      const result = await searchDogs(queryParams);
      setTotalResults(result?.total);

      if (result?.resultIds?.length > 0) {
        const dogsData = await fetchDogDetails(result?.resultIds);
        setDogs(dogsData);

        const uniqueZipCodes = [
          ...new Set(dogsData.map((dog) => dog?.zip_code)),
        ];
        const locationData = await fetchLocationDetails(uniqueZipCodes);

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const locationMap: Record<string, any> = {};
        locationData.forEach((loc) => {
          if (loc?.zip_code && loc?.city && loc?.state) {
            locationMap[loc?.zip_code] = loc;
          }
        });

        setLocations(locationMap);
      } else {
        setDogs([]);
        setLocations({});
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 text-gray-900 p-6 flex flex-col items-center gap-10">
      <Header />
      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-pink-500">
          &#x1F436; Find Your Furry Friend! &#x1F43E;
        </h1>

        <Filters
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          zipCodes={zipCodes}
          setZipCodes={setZipCodes}
          zipCode={zipCode}
          setZipCode={setZipCode}
          ageMin={ageMin}
          setAgeMin={setAgeMin}
          ageMax={ageMax}
          setAgeMax={setAgeMax}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          breeds={breeds}
        />

        <div className="flex md:flex-row flex-col gap-10">
          <LocationFilter setZipCodes={setZipCodes} />
          <GeoLocationFilter setZipCodes={setZipCodes} />
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <span className=" w-32 h-32">
              <Loader />
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {dogs.map((dog) => {
              const isFavorited = favorites.some((fav) => fav.id === dog.id);
              const locationInfo = locations[dog.zip_code];

              return (
                <div
                  key={dog.id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >
                  <div className="relative w-full h-52">
                    <Image
                      src={dog.img}
                      alt={dog.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  <h2 className="text-2xl font-bold mt-4 text-pink-600">
                    {dog.name}
                  </h2>
                  <p className="text-gray-700">Breed: {dog.breed}</p>
                  <p className="text-gray-700">Age: {dog.age} years</p>
                  <p className="text-gray-700">
                    Location:{" "}
                    {locationInfo
                      ? `${locationInfo.city}, ${locationInfo.state}`
                      : "Unknown"}
                  </p>
                  <p className="text-gray-700">Zip Code: {dog.zip_code}</p>
                  <button
                    onClick={() =>
                      isFavorited ? removeFavorite(dog.id) : addFavorite(dog)
                    }
                    className={`mt-3 py-2 px-5 rounded-full transition shadow-md ${
                      isFavorited
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {isFavorited ? "Unfavorite" : "Favorite"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <Pagination
          from={from}
          setFrom={setFrom}
          totalResults={totalResults}
          pageSize={pageSize}
        />
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => router.push("/match")}
          className="bg-pink-500 text-white text-lg py-3 px-8 rounded-full"
        >
          &#x1F50D; Find My Match!
        </button>
      </div>
    </div>
  );
}
