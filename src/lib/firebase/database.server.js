import admin, { firestore } from 'firebase-admin';
import { db } from './firebase.server';
import { saveFileToBucket } from './firestorage.server';

/**
 * @param {any} data
 * @param {string} userId
 */
export async function addBook(data, userId) {
	const bookCollection = db.collection('books');
	const bookRef = await bookCollection.add({
		title: data.title,
		author: data.author,
		short_description: data.short_description,
		description: data.description,
		user_id: userId,
		likes: 0,
		created_at: admin.firestore.Timestamp.now().seconds
	});

	const small_picture_url = await saveFileToBucket(
		data.small_picture,
		`books/${bookRef.id}/small_pictures`
	);
	const main_picture_url = await saveFileToBucket(
		data.main_picture,
		`books/${bookRef.id}/main_pictures`
	);

	await bookRef.update({
		main_picture: main_picture_url,
		small_picture: small_picture_url
	});

	return bookRef.id;
}

/**
 * @param {string} bookId
 */
export async function getBook(bookId) {
	const book = await db.collection('books').doc(bookId).get();

	if (book.exists) {
		return { id: book.id, ...book.data() };
	}

	return null;
}

/**
 *
 * @param {*} id
 * @param {*} userId
 * @param {*} form
 */
export async function editBook(id, userId, form) {
	const bookRef = await db.collection('books').doc(id);
	const main_picture = form.main_picture;
	const small_picture = form.small_picture;

	delete form.small_picture;
	delete form.main_picture;

	await bookRef.update(form);

	if (main_picture) {
		const main_picture_url = await saveFileToBucket(
			main_picture,
			`books/${bookRef.id}/main_pictures`
		);

		await bookRef.update({ main_picture: main_picture_url });
	}

	if (small_picture) {
		const small_picture_url = await saveFileToBucket(
			small_picture,
			`books/${bookRef.id}/small_pictures`
		);

		await bookRef.update({ small_picture: small_picture_url });
	}
}

/**
 *
 * @param {string} bookId
 * @param {string} userId
 */
export async function toggleLike(bookId, userId) {
	const bookDoc = db.collection('books').doc(bookId);
	const userDoc = db.collection('users').doc(userId);
	const user = await userDoc.get();
	const userData = user.data();

	if (userData?.bookIds && userData.booIds.include(bookId)) {
		await userDoc.update({
			bookIds: firestore.FieldValue.arrayRemove(bookId)
		});

		await bookDoc.update({
			likes: firestore.FieldValue.increment(-1)
		});
	} else {
		await userDoc.update({
			bookIds: firestore.FieldValue.arrayUnion(bookId)
		});

		await bookDoc.update({
			likes: firestore.FieldValue.increment(1)
		});
	}

	return await getBook(bookId);
}
