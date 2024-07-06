import { Select } from '@radix-ui/themes';
import { css } from 'styled-system/css';

function PublicationDateFilter() {
  return (
    <Select.Root>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Publication Date"
      />
      <Select.Content
        side="bottom"
        position="popper"
        variant="soft"
        className={css({ maxHeight: '400px' })}
      >
        <Select.Group>
          <Select.Label>출판년도</Select.Label>
          {['19C', '20C'].map(publicationDate => (
            <Select.Item key={publicationDate} value={String(publicationDate)}>
              {publicationDate}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default PublicationDateFilter;
