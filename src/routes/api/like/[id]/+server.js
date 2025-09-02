import { getBook, toggleLike } from '$lib/firebase/database.server';
import { error, json } from '@sveltejs/kit';

export async function PUT({ locals, params }) {
	const id = params.id;

	if (!locals.user) {
		throw error(403, { message: 'Access denied' });
	}

	const book = await getBook(id);
	if (!book) {
		throw error(404, { message: 'Book not found' });
	}

	try {
		const updatedBook = await toggleLike(book.id, locals.user.id);
		return json(updatedBook);
	} catch (err) {
		console.log(err);
		throw error(500, { message: 'Server error' });
	}
}
