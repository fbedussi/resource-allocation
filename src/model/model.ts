import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'

import { Notification } from './notification'
import { User } from './user'

export type Id = string

export type IsoDate = string

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export type AppThunkPromise<R = void> = ThunkAction<Promise<R>, RootState, unknown, Action<string>>

export type TDispatch = ThunkDispatch<RootState, unknown, Action<string>>

export type RootState = {
  user: User
  notifications: Record<Id, Notification>
}
