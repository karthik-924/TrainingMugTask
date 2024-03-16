import { useState } from 'react';
import { Post } from '../../interfaces';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

type params = {
    post: Post,
    liked: boolean,
    saved: boolean
};

export default function PostCard(props: params) {

    const [liked, setLiked] = useState(props.liked);
    const [saved, setSaved] = useState(props.saved);

    // console.log(props.liked,liked)

    return (
        <div className="card bg-white flex-row text-black p-5 gap-5">
            <div className='flex flex-col text-black'>
                <p className="tip">{props.post.title}</p>
                <p className="second-text">{props.post.body}</p>
            </div>
            <div className='flex pb-5 flex-col justify-between items-center'>
                <LikeButton liked={liked} setLiked={setLiked} post={props.post} type='post' />
                <SaveButton saved={saved} setSaved={setSaved} post={props.post} type='post' />
            </div>
        </div>
    );
}