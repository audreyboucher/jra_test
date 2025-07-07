import type { ReactElement } from 'react';
import { TextField } from '@radix-ui/themes';

import type { Action } from './action';
import type { ActionDialogComponent } from '../components/Dialog/types';
import { Method } from '../utils/api';

export type ByMethod<T extends {}> = {
  [key in Method]?: T;
};

export type Element<T> = Omit<T, 'id'>;

export type Content<T extends {}> = ByMethod<{
  title: string;
  submitButton?: string;
  dialog: (props: ActionDialogComponent<T>) => ReactElement;
  action: Action<T>;
  admin?: boolean;
}>;

export type Field<T> = TextField.RootProps & {
  name: keyof T;
  title: string;
};
