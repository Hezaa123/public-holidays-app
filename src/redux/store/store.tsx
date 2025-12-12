import { configureStore } from '@reduxjs/toolkit';
import bankHolidayFilterSlice from '../slices/bankHolidaySlice';

// Create the store
export const store = configureStore({
	reducer: {
		holidays: bankHolidayFilterSlice,
	},
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;