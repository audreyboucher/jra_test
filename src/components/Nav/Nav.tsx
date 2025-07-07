import React from 'react';
import { TabNav, Flex, IconButton } from '@radix-ui/themes';
import { ExitIcon } from '@radix-ui/react-icons';

const Nav = () => {
  return (
    <TabNav.Root>
      <Flex justify="between" align="stretch" width="100%">
        <Flex>
          <TabNav.Link href="/" active={['/', '/contacts'].includes(window.location.pathname)}>Contacts</TabNav.Link>
        </Flex>

        <TabNav.Link href="/logout" tabIndex={-1}>
          <IconButton variant="soft" radius="small" style={{ cursor: 'pointer' }}>
            <ExitIcon />
          </IconButton>
        </TabNav.Link>
      </Flex>
    </TabNav.Root>
  );
};

export default Nav;
