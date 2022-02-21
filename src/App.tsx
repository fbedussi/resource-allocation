import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initAuth } from './backend/init'
import NotificationArea from './components/NotificationArea'
import LoadingPage from './pages/LoadingPage'
import LoginPage from './pages/LoginPage'
import Routes from './Routes'
import userActions from './store/user/actions'
import { selectUserId } from './store/user/selectors'

function App() {
	const dispatch = useDispatch()

	const userId = useSelector(selectUserId)

	const [persistedUser, setPersistedUser] = useState<User | null | undefined>(
		undefined,
	)

	useEffect(() => {
		initAuth
			.then(auth => {
				setPersistedUser(auth.currentUser)
			})
			.catch(() => {
				setPersistedUser(null)
			})
	}, [])

	if (!userId && persistedUser) {
		dispatch(
			userActions.setUser({
				id: persistedUser.uid,
				username: persistedUser.providerData[0].uid,
			}),
		)
	}

	return (
		<>
			{!userId && persistedUser === undefined && <LoadingPage />}
			{userId || persistedUser ? <Routes /> : <LoginPage />}
			<NotificationArea />
		</>
	)
}

export default App
