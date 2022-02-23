interface FetchResponse<T> {
	status: number,
	data: T,
	errors?: Record<string, string[]>,
	flash?: {
		type: 'success' | 'warning' | 'error',
		message: string
	}
}

interface FetchOptions {
	data?: Record<string, any>,
	headers?: Record<string, any>,
	errors?: Record<string, any>,
	body?: any
}

const _fetch = async<T>(method: string, url: string, options: FetchOptions): Promise<FetchResponse<T>> => {
	const params = options?.data && Object.fromEntries([...Object.entries(options.data)].filter(([key, value]) => value !== null));
	const queryString = method === 'GET' && params && `?${new URLSearchParams(params)}` || '';

	if (method !== 'GET' && params) {
		options.headers = {'Content-Type': 'application/json'};
		options.body = JSON.stringify(params);
	}

	const req = await fetch(url + queryString, {
		method,
		headers: {
			...options?.headers
		},
		...options,
		credentials: 'include'
	});
	const res = await req.json();

	return {
		data: res.data,
		errors: res.errors,
		flash: res.flash,
		status: req.status
	}
}

export default {
	/**
	 * Send a GET request to the API.
	 * @param url URL of the resource. URL of the API is prefixed.
	 * @param query The queries to be sent with the url. Transformed to a query string
	 */
	get: async<T = any>(url: string, options?: FetchOptions): Promise<FetchResponse<T>> => {
		return await _fetch<T>('GET', url, options);
	},
	/**
	 * Send a POST request to the API.
	 * @param url URL of the resource. URL of the API is prefixed.
	 * @param data The data to send with the request.
	 */
	post: async<T = any>(url: string, options: FetchOptions): Promise<FetchResponse<T>> => {
		return await _fetch<T>('POST', url, options);
	},
	/**
	 * Send a PUT request to the API.
	 * @param url URL of the resource. URL of the API is prefixed.
	 * @param data The data to send with the request.
	 */
	put: async<T = any>(url: string, options: FetchOptions): Promise<FetchResponse<T>> => {
		return await _fetch<T>('PUT', url, options);
	},
	/**
	 * Send a DELETE request to the api.
	 * @param url URL of the resource. URL of the API is prefixed.
	 * @param data The data to send with the request.
	 */
	delete: async<T = any>(url: string, options?: FetchOptions): Promise<FetchResponse<T>> => {
		return await _fetch<T>('DELETE', url, options);
	}
}