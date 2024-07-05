import { Select } from '@radix-ui/themes';
import { css } from 'styled-system/css';

function AuthorFilter() {
  return (
    <Select.Root>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick a author"
      />
      <Select.Content
        side="bottom"
        position="popper"
        className={css({ maxHeight: '400px' })}
      >
        <Select.Group>
          <Select.Label>작가</Select.Label>
          {['프리드리히 니체', '임마누엘 칸트'].map(author => (
            <Select.Item
              key={author}
              value={String(author)}
              className={css({
                _focus: {
                  backgroundColor: 'gray.100',
                  color: 'black',
                },
              })}
            >
              {author}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AuthorFilter;
