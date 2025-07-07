import React, { type FC } from 'react';
import { Text, Select } from '@radix-ui/themes';

import type { PaginationResponse } from '../../types/api';

import styles from './Pagination.module.scss';

export type Props = Omit<PaginationResponse<any>, 'items'> & {
  onSelectPage: (page: number) => void;
};

const Pagination: FC<Props> = ({ total, page, limit, pages, onSelectPage }) => {
  return (
    <section className={styles.container} aria-label="Pagination">
      <Text>Results: {(page - 1) * limit + (total ? 1 : 0)} - {Math.min((page - 1) * limit + limit, total)} of {total}</Text>

      {total ? (
        <Text className={styles.selectContainer}>Page {
          <Select.Root defaultValue={String(page)} onValueChange={(value) => { onSelectPage(parseInt(value)); }}>
            <Select.Trigger />
            <Select.Content>
              {
                new Array(pages).fill(0)
                  .map((_, index) => index + 1)
                  .map((value) => (
                    <Select.Item value={String(value)} key={value}>
                      {value}
                    </Select.Item>
                  ))
              }
            </Select.Content>
          </Select.Root>
        } of {pages}</Text>
      ) : null}
    </section>
  );
};

export default Pagination;
