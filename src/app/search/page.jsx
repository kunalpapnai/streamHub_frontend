"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api, ENDPOINT, getWatchUrl, media } from "@/lib/api";
import { InboxIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Searchpage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const fetchResult = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get(ENDPOINT.searchResult(query));
      setData(response?.data?.data);
    } catch (err) {
      console.error("Error fetching search results:", err?.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query && query.trim() !== "") {
      window.scrollTo(0, 0);
      fetchResult();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-gray-300" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <InboxIcon
          className="w-32 h-32 text-slate-400 mb-10"
          strokeWidth={1.2}
        />
        <p className="text-lg text-gray-500">No items found.</p>
      </div>
    );
  }

  return (
    <div className="pt-8 px-6 mt-[80px]">
      <h2 id={query} className="text-2xl font-medium mb-6 scroll-m-[100px]">
        Search Result for : "{query}"
      </h2>
      {data == null || data.filter((vid) => vid?.poster_path).length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[150px] sm:h-[200px] md:h-[300px] py-12">
          <InboxIcon
            className="w-32 h-32 text-slate-400 mb-10"
            strokeWidth={1.2}
          />
          <p className="text-lg text-gray-500">No items found.</p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 justify-center w-full py-4">
          {data.filter((vid) => vid?.poster_path)
            .map((vid) => (
              <Link
                href={getWatchUrl(vid?.id, vid?.media_type, vid?.poster_path)}
                key={vid.id}
              >
                <Image
                  src={media(vid?.poster_path)}
                  width={200}
                  height={300}
                  alt={vid?.title || "Poster"}
                  className="min-w-[200px] h-[300px] rounded-lg object-cover"
                />
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Searchpage;