import { Configuration, AuthenticationApi, SystemApi, UserApi } from '$lib/api-client';

const config = new Configuration({
    basePath: 'https://meal-production.up.railway.app'
});

export const authApi = new AuthenticationApi(config);
export const systemApi = new SystemApi(config);
export const userApi = new UserApi(config);