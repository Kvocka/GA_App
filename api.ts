import { Fetcher } from 'openapi-typescript-fetch'
import { useEffect, useState } from 'react';
import { paths } from "./foodTypes";

// Gets the return value from an api function
export type ReturnTypeFromApiFunc<T> = T extends (...args: any[]) => Promise<infer R> ? R : never;

const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: 'https://world.openfoodfacts.org',
});

export const getByBarcode = fetcher.path('/api/v2/product/{barcode}').method('get').create();

export const useApi = <T extends (...args: any[]) => Promise<any>>(apiFunc: T, key: string) => {
    const [data, setData] = useState<ReturnTypeFromApiFunc<T> | null>(null);

    useEffect(() => {
        apiFunc().then((response) => {
            setData(response);
        });
    }, [key]);

    return data;
}

export const useBarcode = (barcode: string) => useApi(() => getByBarcode({ barcode }), barcode);
