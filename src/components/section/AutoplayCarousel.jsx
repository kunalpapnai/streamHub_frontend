'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { getWatchUrl, media } from '@/lib/api';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import Link from 'next/link';

function AutoplayCarousel({ data }){
    const plugin = useRef(
        Autoplay({ 
            delay: 3000, 
            stopOnInteraction: true,
        })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full md:px-0 px-4"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
        >
            <CarouselContent className="">
            {data?.map((vid) => (
                <CarouselItem key={vid.id} className="w-full max-w-[700px] h-[500px]">
                    <Link href={getWatchUrl(vid.id, vid.media_type, vid?.poster_path)}>
                        <Image
                        src={media(vid?.poster_path)}
                        alt=""
                        width={700}
                        height={500}
                        className="w-full h-full bg-slate-600 rounded-lg object-fill"
                        quality={30}
                        />
                    </Link>
                </CarouselItem>
            ))}
            </CarouselContent>
              <div className="absolute bottom-4 right-[12%] hidden md:flex">
                <CarouselPrevious className="w-[60px] h-[60px] cursor-pointer hover:bg-gray-700" />
                <CarouselNext className="w-[60px] h-[60px] ml-2 cursor-pointer hover:bg-gray-700" />
              </div>
        </Carousel>
    )
}

export default AutoplayCarousel