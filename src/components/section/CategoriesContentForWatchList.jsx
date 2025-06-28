'use client';

import { useEffect, useState } from 'react';
import { InboxIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getWatchUrl, media } from '@/lib/api';

function CategoriesContentForWatchList({ fetcher }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await fetcher();
                setData(result);
            } catch (err) {
                console.error("Error loading data", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [fetcher]);

    if (loading) {
        return (
            <ul className="flex gap-4 w-full overflow-scroll scrollbar-hide">
                {new Array(12).fill(0).map((e, index) => (
                    <div key={index} className="min-w-[200px] h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
            </ul>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[300px] py-12">
                <InboxIcon
                    className="w-32 h-32 text-slate-400 mb-10"
                    strokeWidth={1.2}
                />
                <p className="text-lg text-gray-500">No items found.</p>
            </div>
        );
    }

    return (
        <ul className="flex gap-4 w-full overflow-scroll scrollbar-hide">
            {data.map((post) => (
                <Link
                    key={post.id}
                    href={getWatchUrl(post.id, post.media_type, post?.poster_path)}
                >
                    <Image
                        src={media(post?.poster_path)}
                        alt=""
                        width={200}
                        height={300}
                        className="min-w-[200px] h-[300px] rounded-lg object-cover"
                        quality={30}
                    />
                </Link>
            ))}
        </ul>
    );
}

export default CategoriesContentForWatchList;