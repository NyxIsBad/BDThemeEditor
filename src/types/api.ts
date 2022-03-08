import type {RequestEvent} from '@sveltejs/kit';

type ToJSON = { toJSON(...args: any[]): Exclude<JSONValue, ToJSON> };
type JSONObject = { [key: string]: JSONValue };
type JSONValue = string | number | boolean | null | ToJSON | JSONValue[] | JSONObject;

interface Response {
	status?: number,
	headers?: Headers,
	body?: {
		data?: JSONObject,
		flash?: {
			type: 'success' | 'warning' | 'error',
			message: string
		},
		errors?: JSONObject
	}
}

export type Endpoint = (request: RequestEvent) => Promise<Response>;