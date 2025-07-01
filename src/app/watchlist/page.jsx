"use client";

import CategoriesContentForWatchList from '@/components/section/CategoriesContentForWatchList';
import { CategoriesFallback } from '@/components/section/CategoriesSection';
import { buttonVariants } from '@/components/ui/button';
import { api, ENDPOINT } from '@/lib/api';
import { cn } from '@/lib/utils';
import { FolderLockIcon } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux';

// store 
// show list
function WatchList() {
    const userData = useSelector((state) => state.user);
    const fetcher = async () => {
        const res = await api.get(ENDPOINT.getWishlist);
        return res.data.data;
    }

    return (
        <div className="mt-[80px] p-4">
          <h1 className='text-2xl font-medium mb-6'>WatchList</h1>

            {userData.isLoggedIn ? <Suspense fallback={<CategoriesFallback />}>
              <CategoriesContentForWatchList fetcher={fetcher} />
            </Suspense> : <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-4">
                <FolderLockIcon
                    className="w-32 h-32 text-slate-400"
                    strokeWidth={1.2}
                />
                <p className="text-base text-slate-400">
                    Login to see your watchlist
                </p>

                <Link href={"/login"} className={cn(buttonVariants(), "rounded-full px-6 mt-4")}>Login</Link>
            </div>}
        </div>
    )
}

export default WatchList