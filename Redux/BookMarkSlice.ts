import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  bookMark: Array<Books>;
}

interface Books {
    title: string,
    image:string,
    id:string
}


const initialState: CounterState = {
  bookMark: [],
};

export const counterSlice = createSlice({
  name: 'bookMarks',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Books>) => {
    let check=[]
         check = state.bookMark.filter(el => {
          return (el.title === action.payload.title) 
            
        })
      if(check.length==0) {
        state.bookMark.push(action.payload);
      }
    },
    decrement: (state, action: PayloadAction<any>) => {
      state.bookMark = state.bookMark.filter(el => {
        return el.title != action.payload.title;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {increment, decrement} = counterSlice.actions;

export default counterSlice.reducer;
