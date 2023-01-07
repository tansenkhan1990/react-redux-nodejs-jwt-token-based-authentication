import { createSlice } from '@reduxjs/toolkit';

const birthdaySlice = createSlice({
  name: 'birthday',
  initialState: { 
    isDateInvalid: false,
    isUnderAge : false,
    isDataUpdated: false,
  },
  reducers: {
    setBirhtDateInformation(state,actions) {
      state.isDateInvalid = actions.payload.isDateInvalid;
      state.isUnderAge = actions.payload.isUnderAge;
      state.isDataUpdated = actions.payload.isDataUpdated;
    }
  }
});

export const birthdaySliceActions = birthdaySlice.actions;

export default birthdaySlice;