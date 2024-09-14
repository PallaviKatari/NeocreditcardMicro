// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const creditcardSlice = createSlice({
  name: 'creditcard',
  initialState: {
    creditcardType:""

  },
  reducers: {
    setCreditCardInfo: (state, action) => {
        state.creditcardType = action.payload.creditcardType;
       
    },
    clearCreditCardInfo: (state) => {
        state.creditcardType = ""
    },
  },
});

export const { setCreditCardInfo, clearCreditCardInfo } = creditcardSlice.actions;
export default creditcardSlice.reducer;
