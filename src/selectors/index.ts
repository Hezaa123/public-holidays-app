
import type { RootState } from '../redux/store/store';

const selectCountry = (state: RootState) => state.holidays.country;
const selectYear = (state: RootState) => state.holidays.year;

export { selectCountry, selectYear }
