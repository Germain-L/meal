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
 * @interface TokenResponse
 */
export interface TokenResponse {
	/**
	 *
	 * @type {string}
	 * @memberof TokenResponse
	 */
	accessToken?: string;
	/**
	 *
	 * @type {string}
	 * @memberof TokenResponse
	 */
	refreshToken?: string;
}

/**
 * Check if a given object implements the TokenResponse interface.
 */
export function instanceOfTokenResponse(value: object): value is TokenResponse {
	return true;
}

export function TokenResponseFromJSON(json: any): TokenResponse {
	return TokenResponseFromJSONTyped(json, false);
}

export function TokenResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenResponse {
	if (json == null) {
		return json;
	}
	return {
		accessToken: json['access_token'] == null ? undefined : json['access_token'],
		refreshToken: json['refresh_token'] == null ? undefined : json['refresh_token']
	};
}

export function TokenResponseToJSON(json: any): TokenResponse {
	return TokenResponseToJSONTyped(json, false);
}

export function TokenResponseToJSONTyped(
	value?: TokenResponse | null,
	ignoreDiscriminator: boolean = false
): any {
	if (value == null) {
		return value;
	}

	return {
		access_token: value['accessToken'],
		refresh_token: value['refreshToken']
	};
}
