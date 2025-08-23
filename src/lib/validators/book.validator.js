import * as yup from 'yup';

/**
 * @param {FormData} fromData
 */
export async function addBookValidator(fromData) {
	const data = {
		title: fromData.get('title'),
		author: fromData.get('author'),
		short_description: fromData.get('short_description'),
		description: fromData.get('description'),
		small_picture: fromData.get('small_picture'),
		main_picture: fromData.get('main_picture')
	};

	const schema = yup.object({
		title: yup.string().required('Title is required').min(4).max(40),
		author: yup.string().required().min(5).max(200),
		short_description: yup.string().required().min(5).max(200),
		description: yup.string().required().min(5).max(4500),
		small_picture: yup
			.mixed()
			.required()
			.test('fileType', 'The file must be an image', (value) => {
				// @ts-ignore
				if (value && value?.type) {
					// @ts-ignore
					return ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(value.type);
				}

				return true;
			})
			.test('fileSize', 'The file size must be less than 4MB', (value) => {
				// @ts-ignore
				if (value && value.size) {
					// @ts-ignore
					return value.size < 4_000_000;
				}

				return true;
			}),
		main_picture: yup
			.mixed()
			.required()
			.test('fileType', 'The file must be an image', (value) => {
				// @ts-ignore
				if (value && value?.type) {
					// @ts-ignore
					return ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(value.type);
				}

				return true;
			})
			.test('fileSize', 'The file size must be less than 4MB', (value) => {
				// @ts-ignore
				if (value && value.size) {
					// @ts-ignore
					return value.size < 4_000_000;
				}

				return true;
			})
	});

	try {
		const validatedData = await schema.validate(data, { abortEarly: false });
		return { success: true, data: validatedData };
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			return {
				success: false,
				errors: error.inner.map((err) => ({ path: err.path, message: err.message }))
			};
		}

		return { success: false, errors: [{ path: 'unknown', message: 'Unknown error' }] };
	}
}
