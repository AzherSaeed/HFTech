import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'



const store = configureStore({ reducer: {
    authReducer : authReducer
} })


export default store;
