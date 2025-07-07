import React, { useState, useEffect } from 'react';
import { Table, Spinner } from '@radix-ui/themes';

import { Dialog } from '..';

import type { ActionDialogProps } from '../Dialog/types';
import type { Field } from '../../types/common';

type Element<T> = Omit<T, 'id'>;

type Props<T extends {}> = ActionDialogProps<T> & {
  fields: Field<T>[];
};

const InfoDialog = <T extends {}>({ fields, item, action, refresh, open, ...props }: Props<T>) => {
  const [element, setElement] = useState<Element<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (open && !element) {
      action(item)
        .then((res) => setElement(res as Element<T>))
        .then(() => refresh)
        .catch((errorMessage) => setError(errorMessage));
    }
  }, [open]);

  return (
    <Dialog open={open} error={error} {...props}>
      {element
        ? (
          <Table.Root>
            <Table.Body>
              {fields.map(({ name, title }) => (
                <Table.Row key={name}>
                  <Table.ColumnHeaderCell>{title}</Table.ColumnHeaderCell>
                  <Table.Cell>{String((element as T)[name])}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )
        : <Spinner />
      }
    </Dialog>
  );
};

export default InfoDialog;
