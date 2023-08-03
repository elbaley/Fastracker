import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export type Mode = 'normal' | 'fasting' | 'eating';
export interface AppState {
  remainingTime: number | null;
  isStarted: boolean;
  isFinished: boolean;
  mode: Mode;
  endDate: number | null;
  fastingTime: number;
  eatingTime: number;
  showSaveFastingModal: boolean;
}

export const initialState: AppState = {
  remainingTime: null,
  isStarted: false,
  isFinished: false,
  fastingTime: 12,
  eatingTime: 6,
  mode: 'normal',
  endDate: null,
  showSaveFastingModal: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<Partial<AppState>>) => {
      console.log('Setting app state to:');
      console.log({...state, ...action.payload});
      return {...state, ...action.payload};
    },
    setFastingTime: (state, action: PayloadAction<number>) => {
      state.fastingTime = action.payload;
    },
    setEatingTime: (state, action: PayloadAction<number>) => {
      state.eatingTime = action.payload;
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
    setShowSaveModal: (state, action) => {
      state.showSaveFastingModal = action.payload;
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
  setFastingTime,
  setEatingTime,
  setShowSaveModal,
} = appSlice.actions;

//

export default appSlice.reducer;
