import React from 'react';
import { TabNav, Flex } from '@radix-ui/themes';
import { ExitIcon } from '@radix-ui/react-icons';

const Nav = () => {
  return (
    <TabNav.Root>
      <Flex justify="between" align="stretch" width="100%">
        <Flex>
          <TabNav.Link href="/" active={window.location.pathname === '/'}>Contacts</TabNav.Link>
        </Flex>
        <TabNav.Link href="/logout" active={window.location.pathname === '/logout'}><ExitIcon /></TabNav.Link>
      </Flex>
    </TabNav.Root>
  );
};

export default Nav;