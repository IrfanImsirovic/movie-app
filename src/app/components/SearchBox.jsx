"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
export default function SearchBox() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    router.push(`/search/${search}`);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-6xl mx-auto justify-between items-center px-5"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search Movies..."
        className="w-full h-12 rounded-sm placeholder-gray-600 outline-none bg-transparent flex-1"
      />
      <button
        disabled={!search}
        type="submit"
        className="text-gray-500 disabled:text-gray-500 dark:hover:text-white hover:text-black "
      >
        <FaSearch />
      </button>
    </form>
  );
}
