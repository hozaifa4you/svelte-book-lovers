import admin from 'firebase-admin';
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

	const small_picture_url = await saveFileToBucket(data.small_picture, 'books/small_pictures');
	const main_picture_url = await saveFileToBucket(data.main_picture, 'books/main_pictures');

	await bookRef.update({
		main_picture: main_picture_url,
		small_picture: small_picture_url
	});

	return bookRef.id;
}
