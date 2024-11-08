/* tslint:disable */
/* eslint-disable */
/**
 * Meals API
 * API for managing user accounts and authentication for the Meals service
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 *
 * @export
 * @interface PingResponse
 */
export interface PingResponse {
	/**
	 *
	 * @type {string}
	 * @memberof PingResponse
	 */
	message?: string;
}

/**
 * Check if a given object implements the PingResponse interface.
 */
export function instanceOfPingResponse(value: object): value is PingResponse {
	return true;
}

export function PingResponseFromJSON(json: any): PingResponse {
	return PingResponseFromJSONTyped(json, false);
}

export function PingResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PingResponse {
	if (json == null) {
		return json;
	}
	return {
		message: json['message'] == null ? undefined : json['message']
	};
}

export function PingResponseToJSON(json: any): PingResponse {
	return PingResponseToJSONTyped(json, false);
}

export function PingResponseToJSONTyped(
	value?: PingResponse | null,
	ignoreDiscriminator: boolean = false
): any {
	if (value == null) {
		return value;
	}

	return {
		message: value['message']
	};
}
