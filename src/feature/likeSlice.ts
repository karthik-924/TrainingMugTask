import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { Picture, Post } from '@/interfaces'

type LikeState = {
  liked: {
    posts: Post[],
    pictures: Picture[],
  }
}

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.getItem(key)
}

const saveToLocalStorage = (key: string, data: any) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, data);
};

const initialState: LikeState = {
  liked: getFromLocalStorage('liked') ? JSON.parse(getFromLocalStorage('liked') as string) : { posts: [], pictures: [] },
}




export const likeSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<Post>) => {
      const isExist = state.liked.posts.some((data) => data.id === action.payload.id)
      if (!isExist) {
        state.liked.posts.push(action.payload)
        console.log(state.liked)
        localStorage.setItem('liked', JSON.stringify(state.liked))
      }
    },
    dislikePost: (state, action: PayloadAction<number>) => {
      state.liked.posts = state.liked.posts.filter((post) => post.id !== action.payload)
      localStorage.setItem('liked', JSON.stringify(state.liked))
    },
    likePicture: (state, action: PayloadAction<Picture>) => {
      const isExist = state.liked.pictures.some((data) => data.id === action.payload.id)
      if (!isExist) {
        state.liked.pictures.push(action.payload)
        localStorage.setItem('liked', JSON.stringify(state.liked))
      }
    },
    dislikePicture: (state, action: PayloadAction<number>) => {
      state.liked.pictures = state.liked.pictures.filter((picture) => picture.id !== action.payload)
      localStorage.setItem('liked', JSON.stringify(state.liked))
    }
  },
})

export const { likePost, dislikePost, likePicture, dislikePicture } = likeSlice.actions

export const getLikedPosts = (state: RootState) => state.likes.liked.posts

export const getLikedPictures = (state: RootState) => state.likes.liked.pictures

export default likeSlice.reducer