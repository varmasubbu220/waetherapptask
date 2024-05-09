import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isFetching: true,
  isLogin: false,
  isError: false, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogin = true;
      state.isError = false; 
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setError: (state) => {
      state.isError = true; 
      state.isFetching = false; 
    },
  },
});

export const { setUser, setFetching, setError } = userSlice.actions;

export const userReducer = userSlice.reducer;

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const token = localStorage.getItem('token');
if (token) {
  try {
    store.dispatch(setFetching(true));
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    store.dispatch(setUser(decodedToken));
  } catch (error) {
    console.error('Error decoding token:', error);
    store.dispatch(setError()); 
  }finally{
    store.dispatch(setFetching(false));
  }

} else {
  store.dispatch(setFetching(false));
}

export default store;
