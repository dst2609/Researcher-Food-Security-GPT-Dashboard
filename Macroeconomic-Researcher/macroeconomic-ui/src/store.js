import { configureStore } from "@reduxjs/toolkit";
import CountryRangeSlice from "./country";

export const store = configureStore({
  reducer: { countryRange: CountryRangeSlice },
});