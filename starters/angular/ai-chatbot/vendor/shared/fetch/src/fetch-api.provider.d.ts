import { InjectionToken, Injector, Provider } from '@angular/core';
export type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
export declare const FETCH_API: InjectionToken<Fetch>;
/**
 * Provide Fetch API.
 *
 * @param customImpl Use in case you want to provide your own implementation (e.g. a mock).
 * @returns Fetch `Provider`
 */
export declare const provideFetchApi: (customImpl?: (() => Fetch) | ((injector: Injector) => Fetch)) => Provider;
