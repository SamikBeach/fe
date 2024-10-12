import { BeautifulMentionsMenuProps } from 'lexical-beautiful-mentions';
import { css } from 'styled-system/css';

function CustomMenu({ loading, ...props }: BeautifulMentionsMenuProps) {
  return (
    <ul
      className={css({
        position: 'absolute',
        bottom: '40px',
        top: 'auto',
        maxHeight: '200px',
        overflowY: 'auto',
        width: '250px',
        bgColor: 'white',
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)',

        padding: '6px',
      })}
      {...props}
    />
  );
}

export default CustomMenu;
