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

import * as runtime from '../runtime';
import type {
	LoginPost401Response,
	LoginPost500Response,
	LoginRequest,
	RefreshPost200Response,
	RefreshPost401Response,
	RefreshRequest,
	SignupPost400Response,
	SignupPost500Response,
	SignupRequest,
	User
} from '../models/index';
import {
	LoginPost401ResponseFromJSON,
	LoginPost401ResponseToJSON,
	LoginPost500ResponseFromJSON,
	LoginPost500ResponseToJSON,
	LoginRequestFromJSON,
	LoginRequestToJSON,
	RefreshPost200ResponseFromJSON,
	RefreshPost200ResponseToJSON,
	RefreshPost401ResponseFromJSON,
	RefreshPost401ResponseToJSON,
	RefreshRequestFromJSON,
	RefreshRequestToJSON,
	SignupPost400ResponseFromJSON,
	SignupPost400ResponseToJSON,
	SignupPost500ResponseFromJSON,
	SignupPost500ResponseToJSON,
	SignupRequestFromJSON,
	SignupRequestToJSON,
	UserFromJSON,
	UserToJSON
} from '../models/index';

export interface LoginPostRequest {
	loginRequest: LoginRequest;
}

export interface RefreshPostRequest {
	refreshRequest: RefreshRequest;
}

export interface SignupPostRequest {
	signupRequest: SignupRequest;
}

/**
 *
 */
export class AuthenticationApi extends runtime.BaseAPI {
	/**
	 * Authenticate user using email and get tokens
	 */
	async loginPostRaw(
		requestParameters: LoginPostRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters['loginRequest'] == null) {
			throw new runtime.RequiredError(
				'loginRequest',
				'Required parameter "loginRequest" was null or undefined when calling loginPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/login`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: LoginRequestToJSON(requestParameters['loginRequest'])
			},
			initOverrides
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 * Authenticate user using email and get tokens
	 */
	async loginPost(
		requestParameters: LoginPostRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.loginPostRaw(requestParameters, initOverrides);
	}

	/**
	 * Get new access token using refresh token
	 */
	async refreshPostRaw(
		requestParameters: RefreshPostRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<RefreshPost200Response>> {
		if (requestParameters['refreshRequest'] == null) {
			throw new runtime.RequiredError(
				'refreshRequest',
				'Required parameter "refreshRequest" was null or undefined when calling refreshPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/refresh`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: RefreshRequestToJSON(requestParameters['refreshRequest'])
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) =>
			RefreshPost200ResponseFromJSON(jsonValue)
		);
	}

	/**
	 * Get new access token using refresh token
	 */
	async refreshPost(
		requestParameters: RefreshPostRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<RefreshPost200Response> {
		const response = await this.refreshPostRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Create a new user account
	 */
	async signupPostRaw(
		requestParameters: SignupPostRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<User>> {
		if (requestParameters['signupRequest'] == null) {
			throw new runtime.RequiredError(
				'signupRequest',
				'Required parameter "signupRequest" was null or undefined when calling signupPost().'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/signup`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: SignupRequestToJSON(requestParameters['signupRequest'])
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
	}

	/**
	 * Create a new user account
	 */
	async signupPost(
		requestParameters: SignupPostRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<User> {
		const response = await this.signupPostRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
