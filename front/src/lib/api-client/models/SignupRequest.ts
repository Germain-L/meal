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
 * @interface SignupRequest
 */
export interface SignupRequest {
    /**
     * 
     * @type {string}
     * @memberof SignupRequest
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof SignupRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof SignupRequest
     */
    password: string;
}

/**
 * Check if a given object implements the SignupRequest interface.
 */
export function instanceOfSignupRequest(value: object): value is SignupRequest {
    if (!('username' in value) || value['username'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    return true;
}

export function SignupRequestFromJSON(json: any): SignupRequest {
    return SignupRequestFromJSONTyped(json, false);
}

export function SignupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SignupRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'username': json['username'],
        'email': json['email'],
        'password': json['password'],
    };
}

  export function SignupRequestToJSON(json: any): SignupRequest {
      return SignupRequestToJSONTyped(json, false);
  }

  export function SignupRequestToJSONTyped(value?: SignupRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'username': value['username'],
        'email': value['email'],
        'password': value['password'],
    };
}

