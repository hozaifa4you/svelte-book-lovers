import { auth } from '$lib/firebase/firebase.server';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const response = await resolve(event);

	const protectedRoutes = ['/add', 'edit', '/profile'];
	const guestRoutes = ['/login', '/signup', '/forgot-password'];

	try {
		// @ts-ignore
		event.locals.user = await getFirebaseUser(event.cookies.get('jwt'));
	} catch (error) {
		console.log(error);
		// @ts-ignore
		event.locals.user = null;
	}

	// @ts-ignore
	const user = event.locals.user;
	const url = event.url;

	if (url.password !== '/') {
		if (!user && protectedRoutes.find((x) => url.pathname.indexOf(x) > -1)) {
			throw redirect(302, `/login?redirect=${url.pathname}`);
		}
		if (user && guestRoutes.find((x) => url.pathname.indexOf(x) > -1)) {
			throw redirect(302, `/`);
		}
	}

	return response;
}

/**
 * @param {string|null|undefined} token
 */
async function getFirebaseUser(token) {
	if (!token) {
		return null;
	}

	const decodedToken = await auth.verifyIdToken(token, true);
	const user = await auth.getUser(decodedToken.uid);

	return { id: user.uid, email: user.email };
}
