import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';

export async function loginWithGoogle() {
	const auth = getAuth();

	const userCredentials = await signInWithPopup(auth, new GoogleAuthProvider());

	return userCredentials.user;
}

export async function signout() {
	await signOut(getAuth());
}

/**
 * @param {string} email
 * @param {string} password
 */
export async function registerWithEmail(email, password) {
	const auth = getAuth();
	const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
	return userCredentials.user;
}

/**
 * @param {string} email
 * @param {string} password
 */
export async function signinWithEmail(email, password) {
	const auth = getAuth();
	const userCredentials = await signInWithEmailAndPassword(auth, email, password);
	return userCredentials.user;
}
