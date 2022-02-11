import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../model/user'

const initialState: User = {
  id: '',
  username: '',
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, { payload }: PayloadAction<User>) => payload,
  },
})

export default slice.reducer
