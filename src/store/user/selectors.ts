import { RootState } from '../../model/model'

export const selectUser = (state: RootState) => state.user

export const selectUserId = (state: RootState) => state.user.id
