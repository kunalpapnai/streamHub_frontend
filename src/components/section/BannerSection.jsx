import React, { Suspense } from 'react'
import { Skeleton } from '../atom/Skeleton';
import { InboxIcon } from 'lucide-react';
import AutoplayCarousel from './AutoplayCarousel';

async function BannerSection({fetcher}) {
  return (
    <Suspense fallback={<BannerSectionFallback/>}>
      <BannerSectionContent fetcher={fetcher}/>
    </Suspense>
  )
}

async function BannerSectionContent({fetcher}) {
  const data = await fetcher();
  // console.log(data);
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[500px] py-12">
        <InboxIcon
          className="w-32 h-32 text-slate-400 mb-10"
          strokeWidth={1.2}
        />
        <p className="text-lg text-gray-500">No items found.</p>
      </div>
    );
  }

  return (
    <AutoplayCarousel data={data} />
  )
}

function BannerSectionFallback() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Skeleton className="h-[500px] w-[700px] rounded-lg" />
      <Skeleton className="h-[500px] w-[700px] rounded-lg" />
      <Skeleton className="h-[500px] w-[700px] rounded-lg" />
    </div>
  )
}

export default BannerSection