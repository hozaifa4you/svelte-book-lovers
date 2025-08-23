import { json } from '@sveltejs/kit';
import { auth } from '$lib/firebase/firebase.server';

export async function POST({ cookies, request }) {
	try {
		const { token, email } = await request.json();

		const verifiedToken = await auth.verifyIdToken(token ?? '', true);
		if (verifiedToken.email === email) {
			const expiresIn = verifiedToken.exp - Math.floor(Date.now() / 1000);

			cookies.set('jwt', token, {
				maxAge: expiresIn,
				path: '/',
				httpOnly: true,
				secure: false, // Set to true in production with HTTPS
				sameSite: 'lax'
			});

			return json({ message: 'Success' }, { status: 200 });
		}

		return json({ message: 'Access denied' }, { status: 403 });
	} catch (error) {
		console.log('Token API - Error:', error instanceof Error ? error.message : String(error));
		return json({ message: 'Access denied' }, { status: 403 });
	}
}
