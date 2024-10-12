import { BeautifulMentionsMenuItemProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';
import { css } from 'styled-system/css';

const CustomMenuItem = forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ selected, item, ...props }, ref) => {
  return (
    <li
      className={css({
        borderRadius: '4px',
        height: '32px',
        fontSize: '14px',
        px: '4px',

        _selected: {
          bgColor: 'gray.100',
        },
      })}
      {...props}
      ref={ref}
    />
  );
});

export default CustomMenuItem;
