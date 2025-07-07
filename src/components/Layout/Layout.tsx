import React, { useState, useEffect } from 'react';
import { Badge, Button, Flex } from '@radix-ui/themes';

import { Pagination, Table, Nav } from '..';

import type { PaginationRequest, PaginationResponse, Sort } from '../../types/api/common';
import type { Content, Field } from '../../types/common';
import { Method } from '../../utils/api';

import styles from './Layout.module.scss';
import { useRole } from '../../context/auth';
import { Role } from '../../types/api';

type Props<T extends {}> = {
  items: T[];
  emptyItem: T;
  getItems: (filters: (Partial<T> & PaginationRequest & Sort<T>) | void) => void;
  fields: Field<T>[];
  pagination?: Omit<PaginationResponse<T>, 'items'>;
  dialogs: Content<T>;
};

const Layout = <T extends {}>({ items, emptyItem, getItems, fields, pagination, dialogs }: Props<T>) => {
  const role = useRole();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<T>();
  const [openedDialog, setOpenedDialog] = useState<Method | null>(null);
  const [sort, setSort] = useState<Sort<T>>({});
  const [filters, setFilters] = useState<Partial<T>>({});
  const [success, setSuccess] = useState<boolean>(false);

  const getPaginatedItems = () => {
    if (pagination) getItems({ ...filters, ...sort, page: currentPage });
    else getItems();
  };

  const refresh = (item: T) => {
    getPaginatedItems();
    setSelectedItem(item);
    setSuccess(true);
  };

  const onSelectItem = (item: T, method: Method) => {
    setSuccess(false);
    setSelectedItem(item);
    setOpenedDialog(method);
  };

  useEffect(getPaginatedItems, [filters, sort, currentPage]);
  useEffect(getPaginatedItems, []);

  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.main}>
        {dialogs[Method.POST] && (
          <Flex justify="end">
            <Button
              onClick={() => onSelectItem(emptyItem, Method.POST)}
              disabled={dialogs[Method.POST].admin && role !== Role.Admin}
              style={{ cursor: dialogs[Method.POST].admin && role !== Role.Admin ? 'not-allowed' : 'pointer' }}
            >
              Create new contact
              {dialogs[Method.POST].admin && role !== Role.Admin && <Badge color="gray">admin only</Badge>}
            </Button>
          </Flex>
        )}

        <Table
          fields={fields as Field<{}>[]}
          data={items}
          actions={Object.keys(dialogs).reduce((acc, cur) => ({ ...acc, [cur]: {
            action: dialogs[cur as Method]!.action,
            admin: dialogs[cur as Method]!.admin,
          }}), {})}
          onSelect={onSelectItem}
          onSort={(sortBy, isDesc) => setSort({ sortBy, isDesc })}
          onFilter={(field, value) => setFilters((tmp) => ({ ...tmp, [field]: value.trim() }))}
        />

        {pagination && <Pagination {...pagination} onSelectPage={(page) => { if (page !== currentPage) setCurrentPage(page); }} />}

        {selectedItem && openedDialog && dialogs[openedDialog] && (() => {
          const { dialog, ...props } = dialogs[openedDialog]!;
          const DialogComponent = dialog.bind(this);

          return (
            <DialogComponent
              open
              fields={fields as Field<T>[]}
              item={selectedItem}
              refresh={refresh}
              success={success}
              setSuccess={setSuccess}
              onClose={() => {
                setOpenedDialog(null);
                setSuccess(false);
              }}
              {...props}
            />
          );
        })()}
      </main>
    </div>
  );
};

export default Layout;
