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
 * @interface LoginPost401Response
 */
export interface LoginPost401Response {
    /**
     * 
     * @type {string}
     * @memberof LoginPost401Response
     */
    error?: LoginPost401ResponseErrorEnum;
}


/**
 * @export
 */
export const LoginPost401ResponseErrorEnum = {
    UserNotFound: 'User not found',
    InvalidCredentials: 'Invalid credentials'
} as const;
export type LoginPost401ResponseErrorEnum = typeof LoginPost401ResponseErrorEnum[keyof typeof LoginPost401ResponseErrorEnum];


/**
 * Check if a given object implements the LoginPost401Response interface.
 */
export function instanceOfLoginPost401Response(value: object): value is LoginPost401Response {
    return true;
}

export function LoginPost401ResponseFromJSON(json: any): LoginPost401Response {
    return LoginPost401ResponseFromJSONTyped(json, false);
}

export function LoginPost401ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginPost401Response {
    if (json == null) {
        return json;
    }
    return {
        
        'error': json['error'] == null ? undefined : json['error'],
    };
}

  export function LoginPost401ResponseToJSON(json: any): LoginPost401Response {
      return LoginPost401ResponseToJSONTyped(json, false);
  }

  export function LoginPost401ResponseToJSONTyped(value?: LoginPost401Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'error': value['error'],
    };
}

