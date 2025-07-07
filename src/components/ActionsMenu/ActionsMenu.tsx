import React from 'react';
import { Badge, Button, DropdownMenu } from '@radix-ui/themes';

import { useRole } from '../../context/auth';

import { Method } from '../../utils/api';
import { Role } from '../../types/api';
import type { ByMethod, Field } from '../../types/common';
import type { Action } from '../../types/action';

type Content = ByMethod<{
  text: string;
  shortcut: string;
}>;

interface Props<T extends {}> {
  fields: Field<T>[];
  item: T;
  actions: ByMethod<{ action: Action<T>; admin?: boolean }>;
  onSelect: (item: T, method: Method) => void;
};

const ActionsMenu = <T extends {}>({ item, actions, onSelect }: Props<T>) => {
  const role = useRole();

  const content: Content = {
    [Method.GET]: {
      text: "Get details",
      shortcut: '⌘ G',
    },
    [Method.PATCH]: {
      text: "Edit",
      shortcut: '⌘ E',
    },
    [Method.DEL]: {
      text: "Delete",
      shortcut: '⌘ D',
    },
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" style={{ cursor: 'pointer' }}>
          Actions
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {
          Object.keys(actions)
            .filter((key) => content[key as Method])
            .map((key) => {
              const { text, shortcut } = content[key as Method]!;
              const { admin } = actions[key as Method]!;

              return (
                <DropdownMenu.Item
                  key={key}
                  disabled={admin && role !== Role.Admin}
                  shortcut={shortcut}
                  onClick={() => onSelect(item, key as Method)}
                  style={{ cursor: admin && role !== Role.Admin ? 'not-allowed' : 'pointer' }}
                >
                  {text}
                  {admin && role !== Role.Admin && <Badge color="gray">admin only</Badge>}
                </DropdownMenu.Item>
              );
            })
        }
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ActionsMenu;
