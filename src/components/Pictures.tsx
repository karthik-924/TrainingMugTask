
import { Picture } from "@/interfaces";
import axios from "axios";
import PictureCard from "./Home/PictureCard";
import { useAppSelector } from "@/app/hooks";
import { getLikedPictures } from "@/feature/likeSlice";
import { getSavedPictures } from "@/feature/saveSlice";


type PostProps = {
    data: Picture[],
    nextPage: () => void,
    prevPage: () => void,
    page: number,
    loading: boolean,
};

export default function Pictures(props: PostProps) {

    // const response = await getPictures();
    // const pictures = response.data;
    const likedPictures = useAppSelector((state) => getLikedPictures(state))

    const savedPictures = useAppSelector((state) => getSavedPictures(state))

    console.log(likedPictures)
    console.log(savedPictures)

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
                <div className="picturecards w-full h-fit grid grid-cols-3 max-md:grid-cols-2 max-[500px]:grid-cols-1 justify-center items-center gap-5 p-5">
                    {props.data.map((picture: Picture) => (
                        <PictureCard key={picture.id} picture={picture} liked={
                            likedPictures.some((likedPicture: Picture) => likedPicture.id === picture.id)
                        } saved={
                            savedPictures.some((savedPicture: Picture) => savedPicture.id === picture.id)
                        } />
                    ))}
                </div>
            }
            <div className="join">
                <button onClick={() => props.prevPage()} disabled={props.page === 1 ? true : false} className="join-item btn">«</button>
                <button className="join-item btn">Page {props.page}</button>
                <button onClick={() => props.nextPage()} disabled={props.data.length === 0 ? true : false} className="join-item btn">»</button>
            </div>
        </div>
    );
}