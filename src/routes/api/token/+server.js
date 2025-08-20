import { json } from '@sveltejs/kit';
import { auth } from '$lib/firebase/firebase.server';

export async function POST({ cookies, request }) {
	try {
		const { token, email } = await request.json();

		const verifiedToken = await auth.verifyIdToken(token ?? '', true);
		if (verifiedToken.email === email) {
			cookies.set('jwt', token, {
				maxAge: verifiedToken.exp - Date.now() / 1000,
				path: '/'
			});

			return json({ message: 'Success' }, { status: 200 });
		}

		return json({ message: 'Access denied' }, { status: 403 });
	} catch (error) {
		// @ts-ignore
		console.log(error.message);
		return json({ message: 'Access denied' }, { status: 403 });
	}
}
