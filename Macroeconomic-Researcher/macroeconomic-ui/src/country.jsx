import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  range: [1960, 2023],
  country: "China",
};
export const CountryRangeSlice = createSlice({
  name: "countryRangeSlice",
  initialState,
  reducers: {
    setRRange: (state, action) => {
      state.range = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});
export const { setRRange, setCountry } = CountryRangeSlice.actions;
export default CountryRangeSlice.reducer;