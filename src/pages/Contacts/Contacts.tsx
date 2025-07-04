import React, { FC } from 'react';
import { Table } from '@radix-ui/themes';

import { Nav } from '../../components';

const Home: FC = () => {
  return (
    <>
      <Nav />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email address</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone number</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
      </Table.Root>
    </>
  );
};

export default Home;
