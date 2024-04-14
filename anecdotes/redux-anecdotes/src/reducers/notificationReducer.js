import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'NONE',
    reducers: {
        notifyOnAnecdote(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (notification, time) => {   
    return dispatch => {
        dispatch(notifyOnAnecdote(notification))
        setTimeout(() => {
            dispatch(notifyOnAnecdote('NONE'))
        }, (time * 1000))
    }
}

export const { notifyOnAnecdote } = notificationSlice.actions
export default notificationSlice.reducer
