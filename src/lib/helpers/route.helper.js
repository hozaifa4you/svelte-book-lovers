import { goto } from '$app/navigation';

/**
 * @param {URL} url
 */
export async function afterLogin(url) {
	const route = url.searchParams.get('redirect') ?? '/';

	goto(route);
}
