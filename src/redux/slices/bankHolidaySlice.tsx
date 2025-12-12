import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const bankHolidayFiltersSlice = createSlice({
	name: 'holidays',
	initialState: {
		country: 'england-and-wales',
		year: new Date().getFullYear().toString()
	},
	reducers: {
		setCountry: (state, action: PayloadAction<string>) => {
			state.country = action.payload;
		},
		setYear: (state, action: PayloadAction<string>) => {
			state.year = action.payload;
		}
	}
});

export const { setCountry, setYear } = bankHolidayFiltersSlice.actions;
export default bankHolidayFiltersSlice.reducer;