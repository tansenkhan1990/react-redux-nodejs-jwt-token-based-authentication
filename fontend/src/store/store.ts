import { configureStore } from "@reduxjs/toolkit";
import birthdaySlice from "../slices/birthday-slice";

const store = configureStore({
  reducer: { birthday: birthdaySlice.reducer },
});

export default store;
