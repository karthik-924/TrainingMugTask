import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { Picture, Post } from "@/interfaces";

type LikeState = {
  saved: {
    posts: Post[];
    pictures: Picture[];
  };
};

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

const saveToLocalStorage = (key: string, data: any) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, data);
};

const initialState: LikeState = {
  saved: getFromLocalStorage("saved")
    ? JSON.parse(getFromLocalStorage("saved") as string)
    : { posts: [], pictures: [] },
};

export const saveSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    savePost: (state, action: PayloadAction<Post>) => {
      const isExist = state.saved.posts.some(
        (data) => data.id === action.payload.id
      );
      if (!isExist) {
        state.saved.posts.push(action.payload);
        console.log(state.saved);
        localStorage.setItem("saved", JSON.stringify(state.saved));
      }
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.saved.posts = state.saved.posts.filter(
        (post) => post.id !== action.payload
      );
      localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    savePicture: (state, action: PayloadAction<Picture>) => {
      const isExist = state.saved.pictures.some(
        (data) => data.id === action.payload.id
      );
      if (!isExist) {
        state.saved.pictures.push(action.payload);
        localStorage.setItem("saved", JSON.stringify(state.saved));
      }
    },
    removePicture: (state, action: PayloadAction<number>) => {
      state.saved.pictures = state.saved.pictures.filter(
        (picture) => picture.id !== action.payload
      );
      localStorage.setItem("saved", JSON.stringify(state.saved));
    },
  },
});

export const { savePost, removePost, savePicture, removePicture } =
  saveSlice.actions;

export const getSavedPosts = (state: RootState) => state.saved.saved.posts;

export const getSavedPictures = (state: RootState) => state.saved.saved.pictures;

export default saveSlice.reducer;
