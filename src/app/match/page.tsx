"use client";

import { useEffect, useState } from "react";
import { useDogStore } from "@/store/useDogStore";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Dog } from "@/utils/Interfaces/interfaces";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function MatchPage() {
  const { favorites, matchDog, fetchDogDetails, isLoading, setLoading } =
    useDogStore();
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const router = useRouter();

  const findMatch = async () => {
    setLoading(true);
    try {
      const matchId = await matchDog(favorites.map((dog) => dog.id));
      const dogDetails = await fetchDogDetails([matchId]);
      setMatchedDog(dogDetails[0]);
    } catch (error) {
      console.error("Error finding match:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      findMatch();
    } else {
      setLoading(false);
    }
  }, []);

  const handleBackToSearch = () => {
    router.push("/search");
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center bg-pink-100 text-gray-900 p-6 gap-10">
      <Header />
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-lg text-center mt-8">
        <h1 className="text-5xl font-extrabold text-pink-500 mb-6">
          &#x1F495; Your Perfect Match! &#x1F43E;
        </h1>

        {isLoading ? (
          <div className="flex justify-center w-full">
            <div className=" w-32 h-32">
              <Loader />
            </div>
          </div>
        ) : matchedDog ? (
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64">
              <Image
                src={matchedDog.img}
                alt={matchedDog.name}
                fill
                className="object-cover rounded-3xl border-4 border-yellow-300 shadow-md"
              />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-pink-600">
              {matchedDog.name}
            </h2>
            <p className="text-gray-700 text-lg">Breed: {matchedDog.breed}</p>
            <p className="text-gray-700 text-lg">Age: {matchedDog.age} years</p>
            <p className="text-gray-700 text-lg">
              Location: {matchedDog.zip_code}
            </p>
          </div>
        ) : (
          <p className="text-lg text-red-500">
            No match found. Please select some favorite dogs first!
          </p>
        )}

        <button
          onClick={handleBackToSearch}
          className="mt-6 bg-blue-500 text-white text-lg py-3 px-8 rounded-full shadow-lg transition hover:bg-blue-400"
        >
          &#x25C0; Back to Search
        </button>
      </div>
    </div>
  );
}
