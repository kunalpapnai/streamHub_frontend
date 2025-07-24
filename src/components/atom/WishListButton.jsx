"use client";

import React, { useEffect, useState } from "react";
import { LoaderPinwheel, PlusIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { api, ENDPOINT } from "@/lib/api";
import { toast } from "sonner";
import { userLoggedInDetails } from "@/redux/userSlice";

const WishlistButton = ({ wishlist }) => {
    const userData = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [tick, setTick] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData?.user?.wishlist && wishlist?.id) {
            const isInWishlist = userData.user.wishlist.some(item => 
                String(item.id) === String(wishlist.id)
            );
            setTick(isInWishlist);
        } else {
            setTick(false);
        }
    }, [userData?.user?.wishlist, wishlist?.id]);

    if (!userData?.isLoggedIn) return null;

    const addToWishlist = async () => {
        // logic to actually add to wishlist 
        try {
            setLoading(true)
            const res = await api.post(ENDPOINT.addToWishlist, wishlist);
            if(res.status === 200){
                dispatch(userLoggedInDetails(res?.data?.user)); // update Redux user
                toast("Added to watchlist");
            }
        } catch (err) {
            toast(err?.response?.data?.message || "Failed to add to watchlist");
        } finally {
            setLoading(false);
        }
    }

    const deleteFromWishlist = async () => {
        // logic to actually delete from wishlist
        try {
          setLoading(true);
          const res = await api.delete(ENDPOINT.deleteFromWishlist, { data: { id: wishlist.id } });
          if (res.status === 200) {
            dispatch(userLoggedInDetails(res?.data?.user)); // update Redux user
            toast("Removed from watchlist");
          }
        } catch (err) {
          toast(err?.response?.data?.message || "Failed to remove from watchlist");
        } finally {
          setLoading(false);
        }
    };

    return (
        <div>
            {tick ? (
                <Button
                    className={`sm:ml-auto bg-red-500 hover:bg-red-600 ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={deleteFromWishlist}
                    disabled={loading}
                    >
                    {loading ? (
                        <LoaderPinwheel className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <XIcon className="w-4 h-4 mr-[2px]" />
                    )}
                    <p className="">Watchlist </p>
                </Button>
            ) : (
                <Button
                    className={`sm:ml-auto ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={addToWishlist}
                    disabled={loading}
                    >
                    {loading ? (
                        <LoaderPinwheel className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <PlusIcon className="w-4 h-4 mr-[2px]" />
                    )}
                    Watchlist
                </Button>
            )}
        </div>
    );
}

export default WishlistButton;

// this will be build on client side