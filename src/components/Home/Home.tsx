"use client"

import { useEffect, useState } from "react";
import Posts from "../Posts";
import Pictures from "../Pictures";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Picture, Post } from "@/interfaces";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useAppSelector } from "@/app/hooks";
import { getLikedPictures, getLikedPosts } from "@/feature/likeSlice";
import { getSavedPictures, getSavedPosts } from "@/feature/saveSlice";
// import UserProfile from './UserProfile';
import dynamic from "next/dynamic";

const UserProfile = dynamic(() => import('./UserProfile'), { ssr: false });

interface HomeProps {
    activetab: string;
    response: any;
}

export default function Home(props: HomeProps) {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(searchParams.get('tab') || "posts");
    const [page, setPage] = useState(searchParams.get('_start') ? Math.floor(Number(searchParams.get('_start')) / 20) + 1 : 1);
    const [response, setResponse] = useState(props.response);
    
    const pathname = usePathname();
    const router = useRouter();
    
    console.log(props.activetab, props.response);
    const changeTab = (tab: string) => {
        console.log(tab);
        setActive(tab);
        // changePage(1);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("tab", tab);
        newSearchParams.set("_start", "0");
        newSearchParams.set("_limit", "20");
        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    };

    const changePage = (page: number) => {
        setPage(page);
        const newSearchParams = new URLSearchParams(searchParams);
        // console.log((page-1)*20)
        newSearchParams.set("_start", `${(page - 1) * 20}`);
        newSearchParams.set("_limit", "20");
        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        console.log(newUrl);
        router.push(newUrl);
    }

    const nextPage = () => {
        changePage(page + 1);
    }

    const prevPage = () => {
        changePage(page - 1);
    }

    const search = (query: string) => {
        const newResponse = props.response.filter((item: any) => item.title.includes(query));
        console.log(newResponse);
        setResponse(newResponse);
    }

    useEffect(() => {
        if (props.response.length > 0) 
            setLoading(false);
        setResponse(props.response)
    }
    , [props.response]);

    return (
        <Provider store={store}>
            <main className="flex flex-col gap-10 bg-[#e9e7e7] items-center justify-center w-full">
                <UserProfile active={active} />
                <div className="w-[80%] max-lg:w-[90%] border border-solid mt-5 flex flex-col gap-10 items-center border-gray-300 shadow-md rounded-lg p-4">
                    <div className="flex max-[550px]:flex-col justify-between gap-10 w-full">
                        <div role="tablist" className="tabs tabs-bordered flex-1">
                            <a
                                role="tab"
                                onClick={() => changeTab("posts")}
                                className={`tab ${active === "posts" ? "tab-active" : ""}`}
                            >
                                Posts
                            </a>
                            <a
                                role="tab"
                                onClick={() => changeTab("pictures")}
                                className={`tab ${active === "pictures" ? "tab-active" : ""}`}
                            >
                                Pictures
                            </a>
                        </div>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input border-black text-black input-bordered w-auto"
                                onChange={(e) => search(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        {active === "posts" ? <Posts data={response} nextPage={nextPage} prevPage={prevPage} page={page} loading={loading} /> : <Pictures data={response} nextPage={nextPage} prevPage={prevPage} page={page} loading={loading} />}
                    </div>
                </div>
            </main>
        </Provider>
    );
}