import { Configuration, AuthenticationApi, SystemApi, UserApi } from '$lib/api-client';

const config = new Configuration({
	basePath: import.meta.env.VITE_API_BASE_PATH
});

export const authApi = new AuthenticationApi(config);
export const systemApi = new SystemApi(config);
export const userApi = new UserApi(config);
