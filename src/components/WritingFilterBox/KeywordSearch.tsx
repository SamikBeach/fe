import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { css } from 'styled-system/css';

export default function KeywordSearch() {
  return (
    <TextField.Root
      type="text"
      placeholder="Search titles..."
      size="3"
      className={css({
        width: '100%',
        fontSize: '13px',
        height: '30px',
      })}
      radius="medium"
    >
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
    </TextField.Root>
  );
}
