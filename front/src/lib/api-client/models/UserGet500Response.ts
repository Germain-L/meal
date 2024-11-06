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
 * @interface UserGet500Response
 */
export interface UserGet500Response {
    /**
     * 
     * @type {string}
     * @memberof UserGet500Response
     */
    error?: string;
}

/**
 * Check if a given object implements the UserGet500Response interface.
 */
export function instanceOfUserGet500Response(value: object): value is UserGet500Response {
    return true;
}

export function UserGet500ResponseFromJSON(json: any): UserGet500Response {
    return UserGet500ResponseFromJSONTyped(json, false);
}

export function UserGet500ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserGet500Response {
    if (json == null) {
        return json;
    }
    return {
        
        'error': json['error'] == null ? undefined : json['error'],
    };
}

  export function UserGet500ResponseToJSON(json: any): UserGet500Response {
      return UserGet500ResponseToJSONTyped(json, false);
  }

  export function UserGet500ResponseToJSONTyped(value?: UserGet500Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'error': value['error'],
    };
}

