import * as yup from 'yup';

/**
 * @param {FormData} fromData
 */
export async function addBookValidator(fromData) {
	const schema = yup.object({
		title: yup.string().required('Title is required').min(4).max(40),
		author: yup.string().required().min(5).max(200),
		short_description: yup.string().required().min(5).max(200),
		description: yup.string().required().min(5).max(4500),
		small_picture: yup
			.mixed()
			.required()
			.test('fileType', 'The file must be an image', (value) => {
				if (value && value?.type) {
					return ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(value.type);
				}

				return true;
			})
			.test('fileSize', 'The file size must be less than 4MB', (value) => {
				if (value && value.size) {
					return value.size < 4_000_00;
				}

				return true;
			}),
		main_picture: yup
			.mixed()
			.required()
			.test('fileType', 'The file must be an image', (value) => {
				if (value && value?.type) {
					return ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(value.type);
				}

				return true;
			})
			.test('fileSize', 'The file size must be less than 4MB', (value) => {
				if (value && value.size) {
					return value.size < 4_000_00;
				}

				return true;
			})
	});
}
