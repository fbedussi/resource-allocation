import { createSelector } from 'reselect'

import { RootState } from '../../model/model'

const _selectNotifications = (state: RootState) => state.notifications

export const selectNotifications = createSelector(_selectNotifications, notifications => Object.values(notifications))
