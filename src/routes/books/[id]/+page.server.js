import { getBook } from '$lib/firebase/database.server';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const id = params.id;
	const userId = locals.user?.id;

	const book = await getBook(id, userId);
	if (!book) {
		throw error(404, 'Book not found');
	}

	return {
		book
	};
}
