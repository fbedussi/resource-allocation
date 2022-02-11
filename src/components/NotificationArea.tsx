import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import notificationsActions from '../store/notifications/actions'
import { selectNotifications } from '../store/notifications/selectors'
import { Alert, Snackbar } from '../styleguide'

function App() {
  const { t } = useTranslation()
  const notifications = useSelector(selectNotifications)

  const dispatch = useDispatch()

  return <>
    {notifications.map(({ id, type, messageLabelKey, interpolationPayload, autoClose = true }) => (
      <Snackbar key={id} open={true} autoHideDuration={autoClose ? 6000 : undefined} onClose={() => dispatch(notificationsActions.removeNotification(id))}>
        <Alert severity={type}>{t(messageLabelKey, interpolationPayload)}</Alert>
      </Snackbar>
    ))}
  </>
}

export default App;
