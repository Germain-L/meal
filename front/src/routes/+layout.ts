import { redirect } from '@sveltejs/kit';
import { AuthService } from '$lib/services/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
    const publicRoutes = ['/auth'];
    const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));

    // Skip auth check for public routes
    if (isPublicRoute) {
        return {};
    }

    const isAuthenticated = await AuthService.checkAuth();

    if (!isAuthenticated) {
        throw redirect(307, '/auth');
    }

    return {};
};