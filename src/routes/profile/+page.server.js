import { getMyBooks } from '$lib/firebase/database.server';

export async function load({ locals }) {
	// @ts-ignore
	const books = await getMyBooks(locals?.user.id);

	return { books };
}
