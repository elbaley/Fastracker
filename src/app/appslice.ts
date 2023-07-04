import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export type Mode = 'normal' | 'fasting' | 'eating';
interface AppState {
  remainingTime: number | null;
  isStarted: boolean;
  isFinished: boolean;
  mode: Mode;
  endDate: number | null;
  fastingTime: number;
  eatingTime: number;
}

const initialState: AppState = {
  remainingTime: null,
  isStarted: false,
  isFinished: false,
  fastingTime: 12 * 1000,
  eatingTime: 6 * 1000,
  mode: 'normal',
  endDate: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<Partial<AppState>>) => {
      console.log('Setting app state,');
      return {...state, ...action.payload};
    },
    setRemainingTime: (state, action) => {
      state.remainingTime = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    setIsFinished: (state, action) => {
      state.isFinished = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const {
  setRemainingTime,
  setIsStarted,
  setIsFinished,
  setMode,
  setEndDate,
  setAppState,
} = appSlice.actions;

//

export default appSlice.reducer;
