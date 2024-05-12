import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: any[],
  selected:string
}

const initialState: CounterState = {
  value: [],
  selected:""
}

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    set: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
    reset: (state) => {
      state.value = []
    },

    setSelected:(state,action) => {
      state.selected = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { set, reset , setSelected } = documentSlice.actions

export default documentSlice.reducer