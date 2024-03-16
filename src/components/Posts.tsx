import { Post } from "@/interfaces";
import axios from "axios";
import PostCard from "./Home/PostCard";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getLikedPosts } from "@/feature/likeSlice";
import { getSavedPosts } from "@/feature/saveSlice";

type PostProps = {
    data: Post[],
    nextPage: () => void,
    prevPage: () => void,
    page: number,
    loading: boolean,
};

export default function Posts(props: PostProps) {

    const likedPosts = useAppSelector((state) => getLikedPosts(state))

    const savedPosts = useAppSelector((state) => getSavedPosts(state))

    console.log(likedPosts)
    console.log(savedPosts)
    return (
        <div className="flex justify-center items-center flex-col">
            {props.loading ?
                <div className="cards grid grid-cols-3 max-md:grid-cols-2 max-[500px]:grid-cols-1 justify-center items-center gap-5 p-5">
                    {Array(20).fill(0).map((_, index) => (
                        <div key={index} className="skeleton w-[200px] h-[200px]"></div>
                    )
                    )}
                </div>
                    :
                    <div className="cards grid grid-cols-3 max-md:grid-cols-2 max-[500px]:grid-cols-1 justify-center items-center gap-5 p-5">
                        {props.data.map((post: Post) => {
                            // console.log(likedPosts.some((likedPost: Post) => likedPost.id === post.id))
                            return <PostCard key={post.id} post={post} liked={likedPosts.some((likedPost: Post) => likedPost.id === post.id)} saved={savedPosts.some((savedPost: Post) => savedPost.id === post.id)} />
                        })}
                    </div>
                    }
                    <div className="join">
                        <button onClick={() => props.prevPage()} disabled={props.page === 1 ? true : false} className="join-item btn">«</button>
                        <button className="join-item btn">Page {props.page}</button>
                        <button onClick={() => props.nextPage()} disabled={props.data.length === 0 ? true : false} className="join-item btn">»</button>
                    </div>
                </div >
    );
}