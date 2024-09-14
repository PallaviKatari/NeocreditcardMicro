// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import creditcardReducer from './creditcardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    creditcard:creditcardReducer,
    // Add other reducers as needed
  },
});

export default store;
