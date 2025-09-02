import { editBook, getBook } from '$lib/firebase/database.server';
import { addBookValidator } from '$lib/validators/book.validator.js';
import { fail, redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const id = params.id;
	const book = await getBook(id);
	if (!book) {
		throw error(404, { message: 'Book not found' });
	}
	// @ts-ignore
	if (book.user_id !== locals?.user?.id) {
		throw error(403, { message: 'Forbidden' });
	}

	return { book };
}

export const actions = {
	default: async ({ locals, params, request }) => {
		const id = params.id;
		const book = await getBook(id);
		// @ts-ignore
		if (!book || book.user_id !== locals?.user?.id) {
			throw error(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
		const validatedData = await addBookValidator(formData, true);
		if (!validatedData.success) {
			const data = validatedData.data;

			// @ts-ignore
			delete data?.small_picture;
			// @ts-ignore
			delete data?.main_picture;

			return fail(422, { errors: validatedData.errors });
		}

		try {
			await editBook(book.id, locals.user?.id, validatedData.data);
		} catch (error) {
			console.log(error);
			return fail(400, { error: 'Book updated failed' });
		}

		return redirect(303, '/books/' + id);
	}
};
