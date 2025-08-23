import { PUBLIC_STORAGE_BUCKET } from '$env/static/public';
import { storage } from './firebase.server';
import { tmpdir } from 'os';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

/**
 * @param {File} file
 * @returns {Promise<string>} filePath
 */
async function saveFileToDisk(file) {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const filePath = path.join(tmpdir(), v4());
	console.log({ filePath });

	fs.writeFileSync(filePath, buffer, 'base64');

	return filePath;
}

/**
 * @param {File} file
 * @param {string} destination
 * @returns {Promise<string>} publicUrl
 */
export async function saveFileToBucket(file, destination) {
	const filePath = await saveFileToDisk(file);
	const uploaded = await storage.bucket(PUBLIC_STORAGE_BUCKET).upload(filePath, {
		destination,
		public: true
	});

	return uploaded[0].publicUrl();
}
