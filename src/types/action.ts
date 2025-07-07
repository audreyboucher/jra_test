import { ByMethod } from './common';

export type Action<T extends {}> = (item: T) => Promise<any>;
export type Actions<T extends {}> = ByMethod<Action<T>>;
