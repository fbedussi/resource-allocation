import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Id } from '../../model/model'
import { Notification } from '../../model/notification'

const initialState: Record<Id, Notification> = {}

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, { payload }: PayloadAction<Notification>) => {
      state[payload.id] = payload
    },
    removeNotification: (state, { payload }: PayloadAction<Id>) => {
      delete state[payload]
    }
  },
})

export default slice.reducer
