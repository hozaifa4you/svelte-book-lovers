import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export async function loginWithGoogle() {
	const auth = getAuth();

	const userCredentials = await signInWithPopup(auth, new GoogleAuthProvider());

	return userCredentials.user;
}
