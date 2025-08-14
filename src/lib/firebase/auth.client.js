import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export async function loginWithGoogle() {
	const auth = getAuth();

	const userCredentials = await signInWithPopup(auth, new GoogleAuthProvider());

	return userCredentials.user;
}

export async function signout() {
	await signOut(getAuth());
}
