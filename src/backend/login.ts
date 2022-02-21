import {
	browserLocalPersistence,
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth'

import { handleError } from '../libs/errors'
import firebaseApp from './init'

export const loginBe = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	const auth = getAuth(firebaseApp)
	try {
		await setPersistence(auth, browserLocalPersistence)
		const response = await signInWithEmailAndPassword(auth, email, password)
		return {
			id: response.user.uid,
			username: response.user.providerData[0].uid,
		}
	} catch (error: any) {
		handleError(error)
	}
}
