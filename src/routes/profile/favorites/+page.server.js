import { getFavoriteBooks } from '$lib/firebase/database.server';

export async function load({ locals }) {
	// @ts-ignore
	const books = await getFavoriteBooks(locals?.user?.id);

	return { books };
}
