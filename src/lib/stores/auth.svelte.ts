import { browser } from '$app/environment';

function createAuthStore() {
	// Replace with real session check (e.g. SvelteKit load function)
	let isLoggedIn = $state(false);

	const user = {
		name: 'Amara Okonkwo',
		initials: 'AO',
		email: 'amara@example.com'
	};

	function login() {
		isLoggedIn = true;
	}
	function logout() {
		isLoggedIn = false;
	}

	return {
		get isLoggedIn() {
			return isLoggedIn;
		},
		get user() {
			return user;
		},
		login,
		logout
	};
}

export const authStore = createAuthStore();
