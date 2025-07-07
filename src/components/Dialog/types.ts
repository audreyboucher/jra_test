import { ReactElement } from 'react';
import { Dialog } from '@radix-ui/themes';

import type { Action } from '../../types/action';
import type { Field } from '../../types/common';

export type ActionDialog<T extends {}> = {
  submitButton?: string;
  item: T;
  action: Action<T>;
  refresh: (item: T) => void;
  success?: boolean;
  setSuccess?: (success: boolean) => void;
};

export type DialogType = {
  title: string;
  onClose: () => void;
  success?: boolean;
  error?: string | null;
  buttons?: ReactElement;
};

export type DialogProps = DialogType & Dialog.RootProps;

export type ActionDialogProps<T extends {}> = DialogProps & ActionDialog<T>;

export type ActionDialogComponent<T extends {}> = DialogProps & ActionDialog<T> & {
  fields: Field<T>[];
};
