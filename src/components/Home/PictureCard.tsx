import { Picture } from "@/interfaces";


import Image from 'next/image'; // Import the Image component from next/image
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { useState } from "react";

type PictureProps = {
    picture: Picture;
    liked: boolean;
    saved: boolean;
};
export default function PictureCard(props: PictureProps) {
    const [liked, setLiked] = useState(props.liked);
    const [saved, setSaved] = useState(props.saved);
    // console.log(props.picture.thumbnailUrl)
    return (
        <div className="picturecard">
            <img src={props.picture.thumbnailUrl} alt={props.picture.title} />
            <div className="card__content flex flex-col justify-center items-center gap-10 overflow-auto">
                <p className="card__title font-semibold text-xl">{props.picture.title}</p>
                <div className="flex w-full justify-center items-center gap-10">
                    <LikeButton liked={liked} setLiked={setLiked} post={props.picture} type='picture' />
                    <SaveButton saved={saved} setSaved={setSaved} post={props.picture} type='picture' />
                </div>
            </div>
        </div>

    );
}