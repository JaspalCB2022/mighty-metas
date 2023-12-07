// userSessionSlice.js
import {createSlice} from '@reduxjs/toolkit';

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState: {
    userSessionId: null,
  },
  reducers: {
    setUserSessionId: (state, action) => {
      if (!state.userSessionId) {
        state.userSessionId = action.payload;
      }
    },
  },
});

export const {setUserSessionId} = userSessionSlice.actions;
export const selectUserSessionId = state => state.userSession.userSessionId;

export default userSessionSlice.reducer;
