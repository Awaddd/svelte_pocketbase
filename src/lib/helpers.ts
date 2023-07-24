interface ValidateResponse {
	valid: boolean;
	errorMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validate(strings: Record<string, any>): ValidateResponse {
	let errorMessage = null;

	for (const key in strings) {
		const string = strings[key];

		if (string == null || string == '' || typeof string === 'undefined') {
			errorMessage = 'Required properties cannot be empty';
			return {
				valid: false,
				errorMessage
			};
		}
	}

	return { valid: true };
}
