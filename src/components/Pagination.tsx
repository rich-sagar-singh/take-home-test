"use client";

import { PaginationProps } from "@/utils/Interfaces/interfaces";

export default function Pagination({
  from,
  setFrom,
  totalResults,
  pageSize,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / pageSize);
  const currentPage = Math.floor(from / pageSize) + 1;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setFrom(Math.max(from - pageSize, 0))}
        disabled={from === 0}
        className={`p-3 px-3 bg-blue-500 text-white rounded-full transition hover:bg-blue-400 shadow-md md:text-[16px] text-[14px] ${
          from === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        &#x25C0; Previous
      </button>

      <span className="md:text-[16px] text-[14px] font-bold bg-white px-4 py-2 rounded-full shadow-md">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setFrom(from + pageSize)}
        disabled={from + pageSize >= totalResults}
        className={`p-3 px-6 bg-blue-500 text-white rounded-full transition hover:bg-blue-400 shadow-md md:text-[16px] text-[14px] ${
          from + pageSize >= totalResults ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next &#x25B6;
      </button>
    </div>
  );
}
