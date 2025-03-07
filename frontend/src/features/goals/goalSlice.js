import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'
import { get } from 'mongoose'


const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// create new goal
export const createGoal = createAsyncThunk('goal/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//get user goals
export const getGoals = createAsyncThunk('goal/getAll',
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  }
)
//delete user goals
export const deleteGoal = createAsyncThunk('goal/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  }
)


const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    //async actions
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isSuccess = false,
          state.goals.push(action.payload)

      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false,
          state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isSuccess = false,
          state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false,
          state.isError = true
        state.message = action.payload
      })

      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false,
          state.isSuccess = false,
          state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)

      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false,
          state.isError = true
        state.message = action.payload
      })
  }
})





export const { reset } = goalSlice.actions
export default goalSlice.reducer