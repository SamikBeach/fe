import { BeautifulMentionsMenuProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';
import { css } from 'styled-system/css';

const CustomMenu = forwardRef<HTMLUListElement, BeautifulMentionsMenuProps>(
  ({ loading, ...props }, ref) => {
    return (
      <ul
        className={css({
          position: 'absolute',
          bottom: '40px',
          top: 'auto',
          maxHeight: '200px',
          overflowY: 'auto',
          width: '400px',
          bgColor: 'white',
          cursor: 'pointer',
          borderRadius: '8px',
          boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)',

          padding: '6px',
        })}
        {...props}
        ref={ref}
      />
    );
  }
);

export default CustomMenu;
