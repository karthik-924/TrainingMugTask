'use client'

import { useAppSelector } from "@/app/hooks"
import { getLikedPictures, getLikedPosts } from "@/feature/likeSlice"
import { getSavedPictures, getSavedPosts } from "@/feature/saveSlice"
import { useEffect, useState } from "react"


type UserProfileProps = {
    active: string
}

export default function UserProfile(props: UserProfileProps) {
    const likedPosts= useAppSelector((state) => getLikedPosts(state))
    const savedPosts= useAppSelector((state) => getSavedPosts(state))
    const likedPictures = useAppSelector((state) => getLikedPictures(state))
    const savedPictures = useAppSelector((state) => getSavedPictures(state))

    
    return (
        <div suppressHydrationWarning={true} className="w-[80%] max-lg:w-[90%] border border-solid mt-5 flex max-sm:flex-col gap-10 items-center border-gray-300 shadow-md rounded-lg p-4">
            <div className="avatar indicator">
                <span className="indicator-item indicator-bottom rounded-full bottom-5 right-2 bg-gray-800 w-8 flex justify-center items-center h-8">
                    M
                </span>
                <div className="w-32 h-32 rounded-full">
                    <img
                        alt="Tailwind CSS examples"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <div className="title flex flex-col justify-center gap-5 items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-black font-bold">Karthik Emmadi</h1>
                    <p className="text-gray-500">Aspiring Full Stack Developer</p>
                </div>
                <div className="flex gap-10 max-[500px]:gap-5">
                    <button className="btn btn-outline btn-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        Liked : {props.active === "posts" ? likedPosts.length : likedPictures.length}
                    </button>
                    <button className="btn btn-outline btn-accent">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                            />
                        </svg>
                        Saved : {props.active === "posts" ? savedPosts.length : savedPictures.length}
                    </button>
                </div>
            </div>
        </div>
    )
}