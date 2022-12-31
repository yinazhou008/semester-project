import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import quizService from './quizService'

const initialState = {
    quizs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    step: 0,
    submited: []
}



// get user quizs
export const getQuizs = createAsyncThunk('quizs/getAll', async (limit, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await quizService.getQuiz(limit, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const quizSlice = createSlice({
    name: 'quizCard',
    initialState,
    reducers: {
        reset: (state) => initialState,
        increase: (state, action) => {
            state.step += 1;
        },
        decrease: (state, action) => {
            state.step -= 1;
        },
        submitAnswer: (state, action) => {
            state.submited.push(action.payload)
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuizs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuizs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.quizs = action.payload
            })
            .addCase(getQuizs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset, decrease, increase, submitAnswer } = quizSlice.actions
export default quizSlice.reducer 