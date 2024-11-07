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
 * @interface ModelError
 */
export interface ModelError {
	/**
	 * Error message describing what went wrong
	 * @type {string}
	 * @memberof ModelError
	 */
	error?: string;
}

/**
 * Check if a given object implements the ModelError interface.
 */
export function instanceOfModelError(value: object): value is ModelError {
	return true;
}

export function ModelErrorFromJSON(json: any): ModelError {
	return ModelErrorFromJSONTyped(json, false);
}

export function ModelErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelError {
	if (json == null) {
		return json;
	}
	return {
		error: json['error'] == null ? undefined : json['error']
	};
}

export function ModelErrorToJSON(json: any): ModelError {
	return ModelErrorToJSONTyped(json, false);
}

export function ModelErrorToJSONTyped(
	value?: ModelError | null,
	ignoreDiscriminator: boolean = false
): any {
	if (value == null) {
		return value;
	}

	return {
		error: value['error']
	};
}
