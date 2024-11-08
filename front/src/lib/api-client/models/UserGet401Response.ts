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
 * @interface UserGet401Response
 */
export interface UserGet401Response {
	/**
	 *
	 * @type {string}
	 * @memberof UserGet401Response
	 */
	error?: UserGet401ResponseErrorEnum;
}

/**
 * @export
 */
export const UserGet401ResponseErrorEnum = {
	MissingAuthorizationHeader: 'Missing Authorization header',
	InvalidToken: 'Invalid token'
} as const;
export type UserGet401ResponseErrorEnum =
	(typeof UserGet401ResponseErrorEnum)[keyof typeof UserGet401ResponseErrorEnum];

/**
 * Check if a given object implements the UserGet401Response interface.
 */
export function instanceOfUserGet401Response(value: object): value is UserGet401Response {
	return true;
}

export function UserGet401ResponseFromJSON(json: any): UserGet401Response {
	return UserGet401ResponseFromJSONTyped(json, false);
}

export function UserGet401ResponseFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): UserGet401Response {
	if (json == null) {
		return json;
	}
	return {
		error: json['error'] == null ? undefined : json['error']
	};
}

export function UserGet401ResponseToJSON(json: any): UserGet401Response {
	return UserGet401ResponseToJSONTyped(json, false);
}

export function UserGet401ResponseToJSONTyped(
	value?: UserGet401Response | null,
	ignoreDiscriminator: boolean = false
): any {
	if (value == null) {
		return value;
	}

	return {
		error: value['error']
	};
}
