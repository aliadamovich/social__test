import { createSlice } from "@reduxjs/toolkit";


export const appSlice = createSlice({
	name: "app",
	initialState: {
		error: null as string | null,
		status: "idle" as AppStatusType,
	},
	reducers: (create) => ({
		setAppError: create.reducer<{ error: null | string }>((state, action) => {
			state.error = action.payload.error
		}),
		setAppStatus: create.reducer<{ status: AppStatusType }>((state, action) => {
			state.status = action.payload.status
		}),
	}),
	selectors: {
		selectStatus: state => state.status,
		selectError: state => state.error
	}
})

export const appReducer = appSlice.reducer
export const {setAppError, setAppStatus} = appSlice.actions
export const {selectError, selectStatus} = appSlice.selectors


//* Thunks
//инициализация приложения


//* Types

export type InitialAppStateType = ReturnType<typeof appSlice.getInitialState>;
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
