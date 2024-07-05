import { Select } from '@radix-ui/themes';
import { css } from 'styled-system/css';

function WritingFilter() {
  return (
    <Select.Root>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick a writing"
      />
      <Select.Content
        side="bottom"
        position="popper"
        className={css({ maxHeight: '400px' })}
      >
        <Select.Group>
          <Select.Label>Writing</Select.Label>
          {['Thus spoke Zarathustra', 'The Birth of Traged'].map(writing => (
            <Select.Item
              key={writing}
              value={String(writing)}
              className={css({
                _focus: {
                  backgroundColor: 'gray.100',
                  color: 'black',
                },
              })}
            >
              {writing}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default WritingFilter;
