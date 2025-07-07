import React, { type FC } from 'react';
import { Callout } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

import styles from './ErrorDialog.module.scss';

type Props = {
  error: string | null;
};

const ErrorDialog: FC<Props> = ({ error }) => (
  <Callout.Root role="dialog" color="red" className={classNames(styles.container, { [styles.visible]: !!error })}>
    <Callout.Icon><CrossCircledIcon color="red" /></Callout.Icon>
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
);

export default ErrorDialog;
