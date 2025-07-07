import React, { useState } from 'react';
import { Button, Text } from '@radix-ui/themes';

import { Dialog } from '..';

import type { ActionDialogProps } from '../Dialog/types';

const DeleteDialog = <T extends {}>({ submitButton, item, action, refresh, success, onClose, ...props }: ActionDialogProps<T>) => {
  const [error, setError] = useState<string | null>(null);

  const onConfirm = () => {
    action(item)
      .then(refresh)
      .catch(({ message }) => setError(message));
  };

  return (
    <Dialog
      onClose={onClose}
      error={error}
      buttons={(
        <>
          <Button variant="soft" color="gray" onClick={onClose}>Cancel</Button>
          <Button color="red" onClick={onConfirm}>{submitButton || 'Delete'}</Button>
        </>
      )}
      {...props}
    >
      <Text align="center">Are you sure?</Text>
    </Dialog>
  );
};

export default DeleteDialog;
