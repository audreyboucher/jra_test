import React, { useRef, type FC, type RefObject } from 'react';
import { Callout, Dialog, Flex, IconButton, VisuallyHidden } from '@radix-ui/themes';
import { CheckCircledIcon, Cross2Icon, CrossCircledIcon } from '@radix-ui/react-icons';

import useOuterClick from '../../hooks/useOuterClick';

import type { DialogProps } from './types';

import styles from './Dialog.module.scss';

const DialogComponent: FC<DialogProps> = ({ title, onClose, success, error, children, buttons, ...props }) => {
  const contentRef = useRef<HTMLElement>(null);

  useOuterClick(contentRef, onClose);

  return (
    <Dialog.Root {...props}>
      <Dialog.Content ref={contentRef as RefObject<HTMLDivElement>} maxWidth="450px">
        <Flex direction="column" align="center" gap="5">
          <div className={styles.close}>
            <Dialog.Close onClick={onClose}>
              <IconButton variant="soft" color="gray"><Cross2Icon /></IconButton>
            </Dialog.Close>
          </div>

          <Dialog.Title>{title}</Dialog.Title>
          <VisuallyHidden><Dialog.Description>{title}</Dialog.Description></VisuallyHidden>

          <Flex direction="column" className={styles.fullWidth}>{children}</Flex>

          {success && (
            <Callout.Root color="green" className={styles.fullWidth}>
              <Callout.Icon><CheckCircledIcon color="green" /></Callout.Icon>
              <Callout.Text>It has been successfully edited!</Callout.Text>
            </Callout.Root>
          )}

          {error && (
            <Callout.Root color="red" className={styles.fullWidth}>
              <Callout.Icon><CrossCircledIcon color="red" /></Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Flex justify="center" align="center" gap="5" className={styles.fullWidth}>{buttons}</Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogComponent;
