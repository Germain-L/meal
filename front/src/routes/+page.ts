import { systemApi, userApi } from '$lib/api';

export async function load() {
	try {
		// For example, using the ping endpoint from SystemApi
		const data = await systemApi.pingGet();
		return {
			data
		};
	} catch (error) {
		console.error('API Error:', error);
		throw error;
	}
}
