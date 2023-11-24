import { configureStore } from "@reduxjs/toolkit"
import counterSlide from "./slides/counterSlide"
import userReducer from "./slides/userSlide"

export const store = configureStore({
    reducer: {
        counter: counterSlide,
        user: userReducer
    }
})