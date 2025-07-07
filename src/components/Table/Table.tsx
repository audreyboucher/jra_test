import React, { useState } from 'react';
import { Table, Flex, IconButton, TextField } from '@radix-ui/themes';
import { CaretSortIcon, CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';

import { ActionsMenu, SearchBox } from '..';

import { Method } from '../../utils/api';
import type { ByMethod } from '../../types/common';
import type { Action } from '../../types/action';

export type Field<T> = TextField.RootProps & {
  name: keyof T;
  title: string;
};

interface Props<T extends {}> {
  fields: Field<T>[];
  data: T[];
  actions: ByMethod<{ action: Action<T>; admin?: boolean }>;
  onSelect: (item: T, method: Method) => void;
  onSort?: (field: keyof T, isDesc: boolean) => void;
  onFilter?: (field: keyof T, str: string) => void;
};

const TableComponent = <T extends {}>({ fields, data, actions, onSelect, onSort, onFilter }: Props<T>) => {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [isDesc, setIsDesc] = useState<boolean>(true);

  const onSortAction = (field: keyof T) => {
    const originalField = sortBy;

    setSortBy(field);
    setIsDesc((tmp) => {
      const desc = originalField === field ? !tmp : true;
      onSort!(field, desc);
      return desc;
    });
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {fields.filter(({ hidden }) => !hidden).map(({ name, title }) => (
            <Table.ColumnHeaderCell key={name as string}>
              <Flex justify="between" align="center">
                {title}

                {onSort && (
                  <IconButton variant="ghost" color="gray" highContrast={sortBy === name} onClick={() => onSortAction(name)}>
                    {sortBy === name ? (isDesc ? <CaretDownIcon /> : <CaretUpIcon />) : <CaretSortIcon />}
                  </IconButton>
                )}
              </Flex>
            </Table.ColumnHeaderCell>
          ))}

          {Object.keys(actions).length ? <Table.ColumnHeaderCell key='actions' /> : null}
        </Table.Row>
        
        {onFilter && (
          <Table.Row>
            {fields.filter(({ hidden }) => !hidden).map(({ name, title }) => (
              <Table.ColumnHeaderCell key={`search-${String(name)}`}>
                <SearchBox placeholder={title} onChange={(value) => onFilter(name, value)} />
              </Table.ColumnHeaderCell>
            ))}

            {Object.keys(actions).length ? <Table.ColumnHeaderCell /> : null}
          </Table.Row>
        )}
      </Table.Header>

      <Table.Body>
        {
          data.map((item, index) => (
            <Table.Row align="center" key={`item-${index}`}>
              {fields.filter(({ hidden }) => !hidden).map(({ name }) => (
                <Table.Cell key={`item-${index}-${name as string}`}>{String(item[name])}</Table.Cell>
              ))}

              {Object.keys(actions).length ? (
                <Table.Cell key={`item-${index}-action}`}>
                  <ActionsMenu fields={fields} item={item} actions={actions} onSelect={onSelect} key={index} />
                </Table.Cell>
              ) : null}
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Root>
  );
};

export default TableComponent;
