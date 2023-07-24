import type { Admin, Record } from 'pocketbase';

interface BaseUser {
	email: string;
	username: string;
}

export interface User extends BaseUser {
	id: string;
}

export interface NewUser extends BaseUser {
	password: string;
	confirmPassword: string;
}

export interface CurrentUser {
	user: User | null;
	auth: Record | Admin | null;
}
