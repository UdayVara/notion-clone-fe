import { configureStore } from '@reduxjs/toolkit'
import sidebar from './Slice/sidebarSlice'
import document from "./Slice/documentsSlice"

export const store = configureStore({
  reducer: {
    sidebar:sidebar,
    documents:document
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch