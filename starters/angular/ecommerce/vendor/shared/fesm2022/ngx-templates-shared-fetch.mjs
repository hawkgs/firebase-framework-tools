import { InjectionToken, Injector } from '@angular/core';

const FETCH_API = new InjectionToken('FETCH_API');
/**
 * Provide Fetch API.
 *
 * @param customImpl Use in case you want to provide your own implementation (e.g. a mock).
 * @returns Fetch `Provider`
 */
const provideFetchApi = (customImpl) => ({
    provide: FETCH_API,
    // We need to bind the native fetch to globalThis since we are in SSR mode
    // or it will throw an "Illegal invocation"
    useFactory: (injector) => customImpl ? customImpl(injector) : fetch.bind(globalThis),
    deps: [Injector],
});

/**
 * Keeps track of abort controllers for running requests.
 * Use in API services.
 *
 * @returns Abort function that returns an AbortSignal
 */
function fetchAbort() {
    const abortCtrls = new Map();
    return (apiName) => {
        let ctrl = abortCtrls.get(apiName);
        if (ctrl) {
            ctrl.abort();
        }
        ctrl = new AbortController();
        abortCtrls.set(apiName, ctrl);
        return ctrl.signal;
    };
}

// Represents a Fetch API mock created
// purely for demo purposes.
// A delayed promise response
function simulateRequest(jsonDataFn, config, log, abortSignal) {
    let timeout;
    let reject = () => { };
    let completed = false;
    let abort = false;
    // Abort the request if a signal is provided
    abortSignal?.addEventListener('abort', () => {
        if (!completed) {
            log('Request aborted');
            abort = true;
            clearTimeout(timeout);
            reject({ ok: false });
        }
    });
    return new Promise((res, rej) => {
        reject = rej;
        timeout = setTimeout(() => {
            // Asynchronous mock request handlers are non-cancellable.
            // They can still be aborted but any changes that they perform on the mock state
            // (e.g. mock POST requests), if any, are irreversible. This is due to the nature
            // of Promises.
            Promise.resolve(jsonDataFn()).then((resolvedJsonData) => {
                // For Fetch mock async responses, we need to check
                // whether the request has been cancelled upon Promise
                // resolution.
                if (abort) {
                    return;
                }
                log('Responding with data', resolvedJsonData || '<<EMPTY>>');
                completed = true;
                res({
                    ok: true,
                    json: () => Promise.resolve(resolvedJsonData),
                });
            });
        }, config.responseDelay);
    });
}
const DEFAULT_CFG = {
    responseDelay: 200,
    logging: true,
};
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
const withFetchMock = (mockFn, config) => {
    const fullCfg = { ...DEFAULT_CFG, ...config };
    // Used for logging the operation in the console
    const log = (msg, obj) => {
        if (fullCfg?.logging) {
            const prefix = msg[0] !== '*';
            msg = prefix ? msg : msg.slice(1);
            console.info(prefix ? 'Fetch API Mock:' : '', msg.trim(), obj || '');
        }
    };
    return (injector) => (url, options) => {
        const method = options?.method || 'GET';
        log('*'); // Add some spacing in the console
        log(`Executing request ${method} ${url}`);
        const body = options?.body ? JSON.parse(options.body) : null;
        if (body) {
            log('Body', body);
        }
        return simulateRequest(() => mockFn(url.toString(), method, body, injector), fullCfg, log, options?.signal);
    };
};
const FETCH_MOCK_STATE = new InjectionToken('FETCH_MOCK_STATE');
/**
 * Provide, if your Fetch API mock is stateful and uses `FETCH_MOCK_STATE`.
 */
const provideFetchMockState = () => ({
    provide: FETCH_MOCK_STATE,
    useValue: { state: null },
});

/**
 * Generated bundle index. Do not edit.
 */

export { FETCH_API, FETCH_MOCK_STATE, fetchAbort, provideFetchApi, provideFetchMockState, withFetchMock };
//# sourceMappingURL=ngx-templates-shared-fetch.mjs.map
