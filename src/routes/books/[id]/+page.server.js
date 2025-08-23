import { getBook } from '$lib/firebase/database.server';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const id = params.id;

	const book = await getBook(id);
	if (!book) {
		throw error(404, 'Book not found');
	}

	return {
		book
	};
}
