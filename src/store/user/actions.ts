import { loginBe } from '../../backend/login'
import { AppThunkPromise } from '../../model/model'
import notificationsActions from '../notifications/actions'
import { slice } from './slice'

const login = ({ email, password }: { email: string, password: string }): AppThunkPromise => dispatch =>
  loginBe({ email, password })
    .then(user => {
      if (user) {
        dispatch(slice.actions.setUser(user))
      }
    })
    .catch(error => {
      dispatch(notificationsActions.addNotification({ type: 'error', messageLabelKey: error.message, id: error.message }))
    })

const userActions = {
  ...slice.actions,
  login,
}

export default userActions
