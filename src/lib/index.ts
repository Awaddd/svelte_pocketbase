import type { NewUser } from './types/user';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { validate } from './helpers';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const currentUser = writable(pb.authStore.model);

export async function createUser(newUser: NewUser) {
	const isValid = validate(newUser);
	if (!isValid.valid) return isValid.errorMessage;

	const { email, password, username, confirmPassword } = newUser;

	const data = {
		email,
		name: username,
		password,
		passwordConfirm: confirmPassword
	};

	try {
		await pb.collection('users').create(data);
		login(email, password);
	} catch (error) {
		return (isValid.errorMessage = 'Failed to authenticate');
	}
}

export async function login(email: string, password: string) {
	const isValid = validate([email, password]);
	if (!isValid.valid) return isValid.errorMessage;

	try {
		await pb.collection('users').authWithPassword(email, password);
	} catch (error) {
		return (isValid.errorMessage = 'Failed to authenticate');
	}
}

export async function logout() {
	currentUser.set(null);
	return pb.authStore.clear();
}

export function registerListener() {
	pb.authStore.onChange(() => {
		if (pb.authStore.model == null) return;
		currentUser.set(pb.authStore.model);
	});
}
