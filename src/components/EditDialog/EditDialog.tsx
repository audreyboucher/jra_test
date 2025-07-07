import React, { useState, useEffect, type FormEvent } from 'react';
import { TextField, Button, Flex } from '@radix-ui/themes';

import { Dialog } from '..';
import type { ActionDialogProps } from '../Dialog/types';
import { Field } from '../../types/common';

type Props<T extends {}> = ActionDialogProps<T> & {
  fields: Field<T>[];
};

const EditDialog = <T extends {}>({ fields, submitButton, item, action, refresh, setSuccess, ...props }: Props<T>) => {
  const [data, setData] = useState<T>(item);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (data)
      action(data)
        .then(refresh)
        .catch(({ message }) => setError(message));
  };

  useEffect(() => {
    if (!data) setData(item);
  }, []);

  return (
    <Dialog
      {...props}
      error={error}
      buttons={
        <Button type="submit" onClick={onSubmit} disabled={JSON.stringify(item) === JSON.stringify(data)}>
          {submitButton || 'Update'}
        </Button>
      }
    >
      <form onSubmit={onSubmit}>
        <Flex direction="column" gap="3">
          {fields.filter(({ hidden }) => !hidden).map(({ title, name, ...attributes }) => (
            <Flex direction="column" gap="1" key={name}>
              <label htmlFor={name}>{title}:</label>
              <TextField.Root
                {...attributes}
                id={name}
                name={name}
                value={data && data[name] ? String(data[name]) : ''}
                onChange={(event) => {
                  setSuccess && setSuccess(false);
                  setError(null);
                  setData((tmp = item) => ({ ...tmp, [name]: event.target.value }))
                }}
              />
            </Flex>
          ))}
        </Flex>
      </form>
    </Dialog>
  );
};

export default EditDialog;
