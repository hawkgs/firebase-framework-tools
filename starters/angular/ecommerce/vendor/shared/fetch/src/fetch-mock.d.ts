import { InjectionToken, Injector, Provider } from '@angular/core';
/**
 * Fetch Mock configuration object
 */
export type FetchMockConfig = {
    /**
     * Delay of the request response; in milliseconds (Default: `200`)
     */
    responseDelay: number;
    /**
     * Print the requests and their responses in the console (Default: `true`)
     */
    logging: boolean;
};
export interface MockFn {
    (url: string, method: string, body: {
        [key: string]: string;
    } | null, injector: Injector): object | Promise<object>;
}
/**
 * Fetch API Mock
 *
 * **Limitation:** _Asynchronous mock request handlers are non-cancellable.
 * They can still be aborted but any changes that they perform on the mock state
 * (e.g. mock POST requests), if any, are irreversible. This is due to the nature
 * of Promises._
 *
 * @param url
 * @param init
 * @returns
 */
export declare const withFetchMock: (mockFn: MockFn, config?: Partial<FetchMockConfig>) => (injector: Injector) => (url: string | URL | Request, options?: RequestInit) => Promise<Response>;
export declare const FETCH_MOCK_STATE: InjectionToken<{
    state: unknown;
}>;
/**
 * Provide, if your Fetch API mock is stateful and uses `FETCH_MOCK_STATE`.
 */
export declare const provideFetchMockState: () => Provider;
