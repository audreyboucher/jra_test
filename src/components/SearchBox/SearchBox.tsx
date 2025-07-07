import React, { useState, type FC, type ChangeEventHandler } from 'react';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
};

const SearchBox: FC<Props> = ({ placeholder, onChange }) => {
  const [value, setValue] = useState<string>('');

  const onChangeAction: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <TextField.Root placeholder={placeholder} onChange={onChangeAction}  value={value}>
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchBox;
