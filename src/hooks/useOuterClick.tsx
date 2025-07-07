import { useEffect, type RefObject } from 'react';

const useOuterClick = (ref: RefObject<HTMLElement | null>, callback: Function) => {
  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current?.contains(target as Node))
        callback();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOuterClick;
