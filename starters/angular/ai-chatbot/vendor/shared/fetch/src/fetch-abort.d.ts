/**
 * Keeps track of abort controllers for running requests.
 * Use in API services.
 *
 * @returns Abort function that returns an AbortSignal
 */
export declare function fetchAbort(): (n: string) => AbortSignal;
