

import { useAppDispatch } from "@/app/hooks";
import { removePicture, removePost, savePicture, savePost } from "@/feature/saveSlice";
import { Picture, Post } from "@/interfaces";


type SaveButtonProps = {
    post: Post | Picture;
    type: string;
    saved: boolean;
    setSaved: (liked: boolean) => void;
};

export default function SaveButton(props: SaveButtonProps) {

    const dispatch = useAppDispatch();

    const save = () => {
        if (!props.saved) {
            if (props.type === "post") {
                dispatch(savePost(props.post as Post));
            }
            else {
                dispatch(savePicture(props.post as Picture));
            }
        }
        else {
            if (props.type === "post") {
                dispatch(removePost(props.post.id));
            }
            else {
                dispatch(removePicture(props.post.id));
            }
        }
        props.setSaved(!props.saved);
    };

    if (props.saved) {
        if (document.getElementById(JSON.stringify(`save${props.post.id}`)) as HTMLInputElement) {
            (document.getElementById(JSON.stringify(`save${props.post.id}`)) as HTMLInputElement).checked = true;
        }
    }

    return (
        <label className="container">
            <input type="checkbox" id={JSON.stringify(`save${props.post.id}`)} onChange={save} checked={props.saved} />
            <svg className="save-regular" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg>
            <svg className="save-solid" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
        </label>

    );
}