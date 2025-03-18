/**
 * Builds a query parameter string by a provided object.
 *
 * @param params An object with the query params;
 * @returns
 */
export declare function buildQueryParamsString(params?: {
    [key: string]: string | number | string[];
}): string;
