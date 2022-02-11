import { configureStore as configureStoreRTK, PreloadedState } from '@reduxjs/toolkit'

import { RootState } from '../model/model'
import { projectsApi } from '../services/projects'
import notifications from './notifications/slice'
import user from './user/slice'

export function configureStore(preloadedState?: PreloadedState<RootState>) {
  const store = configureStoreRTK({
    reducer: {
      user,
      notifications,
      [projectsApi.reducerPath]: projectsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware),
    preloadedState,
  })

  return store
}
