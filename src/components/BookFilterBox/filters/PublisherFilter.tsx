import { Select } from '@radix-ui/themes';
import { css } from 'styled-system/css';

function PublisherFilter() {
  return (
    <Select.Root>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Publisher"
      />
      <Select.Content
        side="bottom"
        position="popper"
        variant="soft"
        className={css({ maxHeight: '400px' })}
      >
        <Select.Group>
          <Select.Label>출판사</Select.Label>
          {['민음사', '문학동네'].map(publisher => (
            <Select.Item key={publisher} value={String(publisher)}>
              {publisher}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default PublisherFilter;
