import type { Record } from 'pocketbase';
import type { User } from './types/user';

export const userMapper = function (record: Record): User {
	return {
		id: record.id,
		email: record.email,
		username: record.name
	};
};
