import likeReducer from '@/feature/likeSlice'
import saveReducer from '@/feature/saveSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    likes: likeReducer,
    saved: saveReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch