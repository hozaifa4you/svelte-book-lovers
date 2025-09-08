import { addBook } from '$lib/firebase/database.server.js';
import { addBookValidator } from '$lib/validators/book.validator.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const validated = await addBookValidator(formData);
		if (!validated.success) {
			const data = validated.data;

			// @ts-ignore
			delete data?.small_picture;
			// @ts-ignore
			delete data?.main_picture;

			return fail(422, { errors: validated.errors, data: validated.data });
		}

		console.log('User in local: ', locals.user);

		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const bookId = await addBook(validated.data, locals.user.id);

		throw redirect(303, `/books/${bookId}`);
	}
};
