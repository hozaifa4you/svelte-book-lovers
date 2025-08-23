import { addBookValidator } from '$lib/validators/book.validator.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const validated = await addBookValidator(formData);
		if (!validated.success) {
			return fail(422, { errors: validated.errors });
		}

		return { success: true, data: validated.data };
	}
};
