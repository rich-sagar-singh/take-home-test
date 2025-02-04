"use client";

import { useRouter } from "next/navigation";
import { useDogStore } from "@/store/useDogStore";

export default function Header() {
  const router = useRouter();
  const { logout } = useDogStore();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md p-4 rounded-full mt-4">
      <h1 className="text-3xl font-bold text-pink-500">
        &#x1F436; Furry Friend
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full transition hover:bg-red-400 text-sm sm:text-base"
      >
        Logout
      </button>
    </div>
  );
}
